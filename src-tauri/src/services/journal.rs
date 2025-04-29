use rusqlite::Connection;
use crate::{models::Journal, services::db};
use anyhow::Result;

// returns the journal ID after successful creation
pub fn create_journal(conn: &Connection, title: String, content: String, tags: String) -> Result<String> {

    let id = uuid::Uuid::new_v4().to_string();
    if let Ok(_) = db::db_create_journal(conn, &id, &title, Some(&tags), &content) {
        Ok(id)
    }
    else {
        Err(anyhow::anyhow!("Failed to create journal"))
    }
}
pub fn update_journal(conn: &Connection, id: String, title: Option<String>, content: Option<String>, tags: Option<String>) -> Result<()> {
    db::db_update_journal(conn, &id, title.as_deref(), tags.as_deref(), content.as_deref())?;
    Ok(())
}
pub fn delete_journal(conn: &Connection, id: String) -> Result<()> {
    db::db_delete_journal(conn, &id)?;
    Ok(())
}

pub fn get_journal(conn: &Connection, id: String) -> Result<Option<crate::models::Journal>> {
    let mut stmt = conn.prepare("SELECT * FROM journals WHERE id = ?1")?;
    let journal_iter = stmt.query_map(rusqlite::params![id], |row| {
        Ok(crate::models::Journal {
            id: row.get(0)?,
            title: row.get(1)?,
            content: row.get(2)?,
            tags: row.get(3)?,
            created_at: row.get(4)?,
            updated_at: row.get(5)?,
        })
    })?;
    
    for journal in journal_iter {
        return Ok(Some(journal?));
    }
    
    Ok(None)
}
pub fn get_journals(conn: &Connection) -> Result<Vec<crate::models::Journal>> {
    let mut stmt = conn.prepare("SELECT * FROM journals")?;
    let journal_iter = stmt.query_map([], |row| {
        Ok(crate::models::Journal {
            id: row.get(0)?,
            title: row.get(1)?,
            content: row.get(2)?,
            tags: row.get(3)?,
            created_at: row.get(4)?,
            updated_at: row.get(5)?,
        })
    })?;
    
    let mut journals = Vec::new();
    for journal in journal_iter {
        journals.push(journal?);
    }

    Ok(journals)
}

