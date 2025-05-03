use tauri::async_runtime::Mutex;
use tauri::{AppHandle, Emitter, Manager};
use crate::services::db::DatabaseManager;
use crate::models;

#[tauri::command]
pub async fn create_journal(app: tauri::AppHandle, window: tauri::Window, title: String, content: String, rawcontent: String, tags: String ) -> Result<String, String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    // Create the journal
    let r = crate::services::journal::create_journal(
        &conn,
        title,
        content,
        rawcontent,
        tags,
    )
    .map_err(|e| e.to_string());

    if let Ok(id) = r {
        println!("Journal created successfully:\n{id:?}");
        window.emit("db:journal-created", ()).map_err(|e| e.to_string())?;
        return Ok(id);
    } else {
        window
            .emit("db:error", "Failed to create journal")
            .map_err(|e| e.to_string())?;
    }

    Ok("if this was returned, something went wrong.".into())
}

#[tauri::command]
pub async fn update_journal(app: tauri::AppHandle, window: tauri::Window, id: String, title: Option<String>, content: Option<String>, rawcontent:Option<String>, tags: Option<String>) -> Result<(), String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    // Update the journal
    let r = crate::services::journal::update_journal(
        &conn,
        id,
        title,
        content,
        rawcontent,
        tags,
    )
    .map_err(|e| e.to_string());

    if r.is_ok() {
        window.emit("db:journal-updated", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to update journal")
            .map_err(|e| e.to_string())?;
    }
  Ok(())
}

#[tauri::command]
pub async fn delete_journal(app: tauri::AppHandle, window: tauri::Window, id: String) -> Result<(), String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    // Delete the journal
    let r = crate::services::journal::delete_journal(&conn, id).map_err(|e| e.to_string());

    if r.is_ok() {
        window.emit("db:journal-deleted", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to delete journal")
            .map_err(|e| e.to_string())?;
    }
  Ok(())
}

#[tauri::command]
pub async fn get_journal(app: tauri::AppHandle, window: tauri::Window, id: String) -> Result<Option<models::Journal>, String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    // Get the journal
    let r = crate::services::journal::get_journal(&conn, id).map_err(|e| e.to_string());

    if r.is_ok() {
        window.emit("db:journal-fetched", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to fetch journal")
            .map_err(|e| e.to_string())?;
    }
  Ok(r?)
}

#[tauri::command]
pub async fn get_journals(app: tauri::AppHandle, window: tauri::Window) -> Result<Vec<models::Journal>, String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    // Get the journals
    let r = crate::services::journal::get_journals(&conn).map_err(|e| e.to_string());

    if r.is_ok() {
        window.emit("db:journals-fetched", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to fetch journals")
            .map_err(|e| e.to_string())?;
    }
  Ok(r?)
}
