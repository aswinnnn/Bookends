use anyhow::Result;
use dirs;
use std::path::{Path, PathBuf};

use super::db;

pub fn data_path() -> PathBuf {
    dirs::data_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("com.bookends.app")
}

pub fn db_path() -> PathBuf {
    if !data_path().join(".bookends.dat").exists() {
        std::fs::create_dir_all(&data_path()).unwrap();
        std::fs::File::create_new(&data_path().join(".bookends.dat")).unwrap();
        println!(
            "[db_path()] Created database file at {:?}",
            data_path().join(".bookends.dat")
        );
    }
    data_path().join(".bookends.dat")
}

pub fn settings_path() -> PathBuf {
    data_path().join("settings.json")
}

pub fn themes_path() -> PathBuf {
    data_path().join("themes")
}

pub fn create_paths() -> Result<()> {
    if !data_path().exists() {
        eprintln!(
            "[services::paths] There is no data path at {:?}",
            data_path()
        );
        Ok(())
    } else {
        if let Err(e) = std::fs::File::create_new(&db_path()) {
            eprintln!(
                "[services::paths] Created/Found database file at {:?}: {}",
                db_path(),
                e
            );
        }
        if !settings_path().exists() {
            std::fs::File::create_new(&settings_path())?;
            println!(
                "[services::paths] Created settings file at {:?}",
                settings_path()
            );
        } else if !themes_path().exists() {
            std::fs::create_dir_all(&themes_path())?;
            println!(
                "[services::paths] Created themes folder at {:?}",
                themes_path()
            );
        }
        Ok(())
    }
}

pub fn wallpaper_path() -> PathBuf {
    data_path().join("wallpaper.jpg")
}
