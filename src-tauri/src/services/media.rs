use crate::{models::Media, services::db};
use anyhow::Result;
use rusqlite::Connection;

// Create a new media record
pub fn create_media(
    conn: &Connection,
    journal_id: String,
    customenabled: bool,
    backgroundimage: Option<String>,
    isbgenabled: bool,
    primary_color: Option<String>,
    secondary_color: Option<String>,
    text_color: Option<String>,
    song: Option<String>,
    font_title: Option<String>,
    font_body: Option<String>,
) -> Result<()> {
    let media = Media {
        journal_id,
        customenabled,
        backgroundimage,
        isbgenabled,
        primary_color,
        secondary_color,
        text_color,
        song,
        font_title,
        font_body,
    };

    db::db_create_media(conn, &media)?;
    Ok(())
}

// Update an existing media record
pub fn update_media(
    conn: &Connection,
    journal_id: String,
    customenabled: bool,
    backgroundimage: Option<String>,
    isbgenabled: Option<bool>,
    primary_color: Option<String>,
    secondary_color: Option<String>,
    text_color: Option<String>,
    song: Option<String>,
    font_title: Option<String>,
    font_body: Option<String>,
) -> Result<()> {
    let media = Media {
        journal_id,
        customenabled,
        backgroundimage,
        isbgenabled: isbgenabled.unwrap_or(false), // Default to false if not provided
        primary_color,
        secondary_color,
        text_color,
        song,
        font_title,
        font_body,
    };

    db::db_update_media(conn, &media)?;
    Ok(())
}

// Delete a media record by journal_id
pub fn delete_media(conn: &Connection, journal_id: String) -> Result<()> {
    db::db_delete_media(conn, &journal_id)?;
    Ok(())
}

// Get a single media record by journal_id
pub fn get_media(conn: &Connection, journal_id: String) -> Result<Option<Media>> {
    db::db_get_media(conn, &journal_id)
}

// Get all media records
pub fn get_all_media(conn: &Connection) -> Result<Vec<Media>> {
    let mut stmt = conn.prepare("SELECT * FROM media")?;
    let media_iter = stmt.query_map([], |row| {
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
    })?;

    let mut media_records = Vec::new();
    for media in media_iter {
        media_records.push(media?);
    }

    Ok(media_records)
}
