use tauri::async_runtime::Mutex;
use tauri::{AppHandle, Emitter, Manager, Window};
use crate::services::db::DatabaseManager;
use crate::services::media;
use crate::models;
use anyhow::Result;
use fastrand::i8;

#[tauri::command]
pub async fn create_media(
    app: tauri::AppHandle,
    window: tauri::Window,
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
) -> Result<(), String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    let wall_id: i8 = fastrand::i8(..=7);
    // Apply default values for optional parameters
    let default_backgroundimage = Some(format!("/assets/{wall_id}.avif"));
    let default_primary_color = Some("#FFFFFF".to_string());
    let default_secondary_color = Some("#000000".to_string());
    let default_text_color = Some("#333333".to_string());
    let default_song = Some("default_song.mp3".to_string());
    let default_font_title = Some("Playfair Display".to_string());
    let default_font_body = Some("Lexend Deca".to_string());

    let result = media::create_media(
        &conn,
        journal_id,
        customenabled,
        backgroundimage.or(default_backgroundimage),
        isbgenabled.unwrap_or(false), // Default to false if not provided
        primary_color.or(default_primary_color),
        secondary_color.or(default_secondary_color),
        text_color.or(default_text_color),
        song.or(default_song),
        font_title.or(default_font_title),
        font_body.or(default_font_body),
    )
    .map_err(|e| e.to_string());

    if result.is_ok() {
        window.emit("db:media-created", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to create media")
            .map_err(|e| e.to_string())?;
    }

    result
}

#[tauri::command]
pub async fn update_media(
    app: AppHandle,
    window: Window,
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
) -> Result<(), String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    let result = media::update_media(
        &conn,
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
    )
    .map_err(|e| e.to_string());

    if result.is_ok() {
        window.emit("db:media-updated", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to update media")
            .map_err(|e| e.to_string())?;
    }

    result
}

#[tauri::command]
pub async fn delete_media(
    app: AppHandle,
    window: Window,
    journal_id: String,
) -> Result<(), String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    let result = media::delete_media(&conn, journal_id).map_err(|e| e.to_string());

    if result.is_ok() {
        window.emit("db:media-deleted", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to delete media")
            .map_err(|e| e.to_string())?;
    }

    result
}

#[tauri::command]
pub async fn get_media(
    app: AppHandle,
    window: Window,
    journal_id: String,
) -> Result<Option<models::Media>, String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    let result = media::get_media(&conn, journal_id).map_err(|e| e.to_string());

    if result.is_ok() {
        window.emit("db:media-fetched", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to fetch media")
            .map_err(|e| e.to_string())?;
    }

    result
}

#[tauri::command]
pub async fn get_all_media(
    app: AppHandle,
    window: Window,
) -> Result<Vec<models::Media>, String> {
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    let result = media::get_all_media(&conn).map_err(|e| e.to_string());

    if result.is_ok() {
        window.emit("db:media-list-fetched", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to fetch media list")
            .map_err(|e| e.to_string())?;
    }

    result
}