use crate::{models::Journal, services::db};
use anyhow::Result;
use rusqlite::Connection;

// returns the journal ID after successful creation
pub fn create_journal(
    conn: &Connection,
    title: String,
    content: String,
    rawcontent: String,
    tags: String,
) -> Result<String> {
    let id = uuid::Uuid::new_v4().to_string();
    if let Ok(_) = db::db_create_journal(conn, &id, &title, Some(&tags), &content, &rawcontent) {
        Ok(id)
    } else {
        Err(anyhow::anyhow!("Failed to create journal"))
    }
}

pub fn update_journal(
    conn: &Connection,
    id: String,
    title: Option<String>,
    content: Option<String>,
    rawcontent: Option<String>,
    tags: Option<String>,
) -> Result<()> {
    if let Some(t) = title {
        db::db_update_journal(conn, &id, Some(&t), None, None, None)?;
    }
    if let Some(c) = content {
        if let Some(r) = rawcontent {
            db::db_update_journal(conn, &id, None, None, Some(&c), Some(&r))?;
        } else {
            eprintln!("[services::journal] CONTENT IS THERE but Raw content is None");
        }
    }
    if let Some(t) = tags {
        db::db_update_journal(conn, &id, None, Some(&t), None, None)?;
    }
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
            tags: row.get(2)?,
            content: row.get(3)?,
            rawcontent: row.get(4)?,
            created_at: row.get(5)?,
            updated_at: row.get(6)?,
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
            tags: row.get(2)?,
            content: row.get(3)?,
            rawcontent: row.get(4)?,
            created_at: row.get(5)?,
            updated_at: row.get(6)?,
        })
    })?;

    let mut journals = Vec::new();
    for journal in journal_iter {
        journals.push(journal?);
    }

    Ok(journals)
}
