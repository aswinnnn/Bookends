// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod commands;
mod models;
mod services;
use commands::db::db_startup;
use commands::journals::{
    create_journal, delete_journal, get_journal, get_journals, update_journal,
};
use commands::media::{create_media, delete_media, get_all_media, get_media, update_media};
use services::db::DatabaseManager;
use tauri::{async_runtime::Mutex, Manager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                // Enable the developer tools.
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            };
            Ok(())
        })
        .manage(Mutex::new(
            DatabaseManager::new().expect("Failed to create database manager"),
        ))
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_prevent_default::init())
        .invoke_handler(tauri::generate_handler![
            db_startup,
            create_journal,
            update_journal,
            delete_journal,
            get_journal,
            get_journals,
            get_media,
            create_media,
            update_media,
            delete_media,
            get_all_media
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
