use crate::{models, services::db::{self, create_tables, DatabaseManager}};
use tauri::{async_runtime::Mutex, Emitter, Manager};
use crate::services::paths;

#[tauri::command]
pub async fn db_startup(app: tauri::AppHandle, window: tauri::Window) -> Result<(), String> {

    // Create the necessary paths for the database and everything else, if it does not exist:
    paths::create_paths().map_err(|e| e.to_string())?;
    // Initialize the database manager
    let db_st = app.state::<Mutex<DatabaseManager>>();
    let db_manager = db_st.lock().await;
    // Get a connection from the pool
    let conn = db_manager.get_connection().map_err(|e| e.to_string())?;

    // Create the necessary tables
    let r = create_tables(&conn).map_err(|e| e.to_string());
    if r.is_ok() {
        window.emit("db:ready", ()).map_err(|e| e.to_string())?;
    } else {
        window
            .emit("db:error", "Failed to create tables")
            .map_err(|e| e.to_string())?;
    }

    Ok(())
}
