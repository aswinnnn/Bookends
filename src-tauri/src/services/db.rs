use std::sync::Mutex;

use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::{params, Connection, OptionalExtension};
use anyhow::Result;
use crate::models::Media;

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
    {
        let mut stmt = conn.prepare(
            "CREATE TABLE IF NOT EXISTS journals (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                tags TEXT,
                content TEXT,
                rawcontent TEXT,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL
            )",
        )?;
        stmt.execute([])?;
        eprintln!("[services::db] Created journals table");
    }

    // Create the media table if it doesn't exist
    {
        let mut stmt = conn.prepare(
            "CREATE TABLE IF NOT EXISTS media (
                journal_id TEXT PRIMARY KEY,
                customenabled BOOLEAN,
                backgroundimage TEXT,
                isbgenabled BOOLEAN,
                primary_color TEXT,
                secondary_color TEXT,
                text_color TEXT,
                song TEXT,
                font_title TEXT,
                font_body TEXT,
                FOREIGN KEY(journal_id) REFERENCES journals(id) ON DELETE CASCADE
            )",
        )?;
        stmt.execute([])?;
        eprintln!("[services::db] Created media table");
    }

    Ok(())
}

pub fn db_create_journal(conn: &Connection, id: &str, title: &str, tags: Option<&str>, content: &str, rawcontent: &str) -> Result<()> {
    // Use a prepared statement for better performance
    let mut stmt = conn.prepare(
        "INSERT INTO journals (id, title, tags, content, rawcontent, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, datetime('now', 'localtime'), datetime('now','localtime'))",
    )?;
    stmt.execute(rusqlite::params![id, title, tags.unwrap_or(""), content, rawcontent])?;
    
    Ok(())
}

pub fn db_update_journal(conn: &Connection, id: &str, title: Option<&str>, tags: Option<&str>, content: Option<&str>, rawcontent: Option<&str>) -> Result<()> {
    
    // Use a fixed query with COALESCE to avoid dynamic query construction
    conn.execute(
        "UPDATE journals
         SET updated_at = datetime('now', 'localtime'),
             title = COALESCE(?1, title),
             tags = COALESCE(?2, tags),
             content = COALESCE(?3, content),
             rawcontent = COALESCE(?4, rawcontent)
         WHERE id = ?5",
        rusqlite::params![title, tags, content, rawcontent, id],
    )?;
    
    Ok(())
}

pub fn db_delete_journal(conn: &Connection, id: &str) -> Result<()> {
    // Use a prepared statement for better performance
    let mut stmt = conn.prepare("DELETE FROM journals WHERE id = ?1")?;
    stmt.execute(rusqlite::params![id])?;
    
    Ok(())
}

// Insert a new media record
pub fn db_create_media(conn: &Connection, media: &Media) -> Result<()> {
    let mut stmt = conn.prepare(
        "INSERT INTO media (
            journal_id, customenabled, backgroundimage, isbgenabled, primary_color, secondary_color, text_color, song, font_title, font_body
        ) VALUES (?1,?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
    )?;
    stmt.execute(params![
        media.journal_id,
        media.customenabled,
        media.backgroundimage,
        media.isbgenabled,
        media.primary_color,
        media.secondary_color,
        media.text_color,
        media.song,
        media.font_title,
        media.font_body
    ])?;
    Ok(())
}

// Update an existing media record
pub fn db_update_media(conn: &Connection, media: &Media) -> Result<()> {
    conn.execute(
        "UPDATE media
         SET backgroundimage = COALESCE(?1, backgroundimage),
             isbgenabled = COALESCE(?2, isbgenabled),
             primary_color = COALESCE(?3, primary_color),
             secondary_color = COALESCE(?4, secondary_color),
             text_color = COALESCE(?5, text_color),
             song = COALESCE(?6, song),
             font_title = COALESCE(?7, font_title),
             font_body = COALESCE(?8, font_body)
         WHERE journal_id = ?9",
        params![
            media.backgroundimage,
            media.isbgenabled,
            media.primary_color,
            media.secondary_color,
            media.text_color,
            media.song,
            media.font_title,
            media.font_body,
            media.journal_id
        ],
    )?;
    Ok(())
}

// Fetch a media record by journal_id
pub fn db_get_media(conn: &Connection, journal_id: &str) -> Result<Option<Media>> {
    let mut stmt = conn.prepare(
        "SELECT journal_id, backgroundimage, isbgenabled, primary_color, secondary_color, text_color, song, font_title, font_body
         FROM media
         WHERE journal_id = ?1",
    )?;
    let media = stmt.query_row(params![journal_id], |row| {
        Ok(Media {
            journal_id: row.get(0)?,
            customenabled: row.get(1)?,
            backgroundimage: row.get(2)?,
            isbgenabled: row.get(3)?,
            primary_color: row.get(4)?,
            secondary_color: row.get(5)?,
            text_color: row.get(6)?,
            song: row.get(7)?,
            font_title: row.get(8)?,
            font_body: row.get(9)?,
        })
    }).optional()?;
    Ok(media)
}

// Delete a media record by journal_id
pub fn db_delete_media(conn: &Connection, journal_id: &str) -> Result<()> {
    let mut stmt = conn.prepare("DELETE FROM media WHERE journal_id = ?1")?;
    stmt.execute(params![journal_id])?;
    Ok(())
}

