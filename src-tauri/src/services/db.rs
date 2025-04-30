use std::sync::Mutex;

use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::Connection;
use anyhow::Result;
use super::paths::db_path;

pub struct DatabaseManager {
    pool: Pool<SqliteConnectionManager>,
}
// Pool doesnt implement Default, which is required for tauri's state management, so we have to use a wrapper 
// to get the database manager.


impl DatabaseManager {
    pub fn new() -> Result<Self> {
        let manager = SqliteConnectionManager::file(db_path())
            .with_init(|conn| {
                // Set SQLite pragmas for performance and reliability
                conn.execute_batch("
                    PRAGMA journal_mode = WAL;
                    PRAGMA synchronous = NORMAL;
                    PRAGMA foreign_keys = ON;
                ")?;
                Ok(())
            });
        
        let pool = Pool::new(manager)?;
        
        Ok(Self { pool })
    }
    
    pub fn get_connection(&self) -> Result<r2d2::PooledConnection<SqliteConnectionManager>> {
        // Provide detailed error message for connection retrieval
        self.pool.get().map_err(|e| anyhow::anyhow!("Failed to get connection from pool: {}", e))
    }
}

impl Default for DatabaseManager {
    fn default() -> Self {
        DatabaseManager::new().expect("Failed to create database manager")
    }
}

pub fn create_tables(conn: &Connection) -> Result<()> {
    // Create the journals table if it doesn't exist
    if let Err(e) = conn.execute(
        "CREATE TABLE IF NOT EXISTS journals (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            tags TEXT,
            content TEXT,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL
        )",
        [],
    ) {
        eprintln!("[services::db] Failed to create journals table: {}", e);
    } else {
        eprintln!("[services::db] Create journals table");
    }
    
    Ok(())
}

pub fn db_create_journal(conn: &Connection, id: &str, title: &str, tags: Option<&str>, content: &str) -> Result<()> {
    // Use a prepared statement for better performance
    let mut stmt = conn.prepare(
        "INSERT INTO journals (id, title, tags, content, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, datetime('now'), datetime('now'))",
    )?;
    stmt.execute(rusqlite::params![id, title, tags.unwrap_or(""), content])?;
    
    Ok(())
}

pub fn db_update_journal(conn: &Connection, id: &str, title: Option<&str>, tags: Option<&str>, content: Option<&str>) -> Result<()> {
    
    // Use a fixed query with COALESCE to avoid dynamic query construction
    conn.execute(
        "UPDATE journals
         SET updated_at = datetime('now'),
             title = COALESCE(?1, title),
             tags = COALESCE(?2, tags),
             content = COALESCE(?3, content)
         WHERE id = ?4",
        rusqlite::params![title, tags, content, id],
    )?;
    
    Ok(())
}

pub fn db_delete_journal(conn: &Connection, id: &str) -> Result<()> {
    // Use a prepared statement for better performance
    let mut stmt = conn.prepare("DELETE FROM journals WHERE id = ?1")?;
    stmt.execute(rusqlite::params![id])?;
    
    Ok(())
}

