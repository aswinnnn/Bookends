use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::{Connection};
use anyhow::Result;

pub struct DatabaseManager {
    pool: Pool<SqliteConnectionManager>,
}

impl DatabaseManager {
    pub fn new(db_path: &str) -> Result<Self> {
        let manager = SqliteConnectionManager::file(db_path)
            .with_init(|conn| {
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
        self.pool.get().map_err(|e| e.into())
    }
}

fn create_tables(conn: &Connection) -> Result<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS journals (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            tags TEXT,
            content TEXT,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL
        )",
        [],
    )?;
    
    Ok(())
}