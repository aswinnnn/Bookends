use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Journal {
    pub id: String,
    pub title: String,
    pub content: String,
    pub rawcontent: String,
    pub tags: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize)]
pub struct Media {
    pub journal_id: String,          // Foreign key referencing the journal
    pub backgroundimage: Option<String>, // URL or path to the background image
    pub isbgenabled: bool,           // Whether the background image is enabled
    pub primary_color: Option<String>,   // Primary color (e.g., for UI themes)
    pub secondary_color: Option<String>, // Secondary color
    pub text_color: Option<String>,      // Text color
    pub song: Option<String>,            // Path or URL to an associated song
    pub font_title: Option<String>,      // Font for the title
    pub font_body: Option<String>,       // Font for the body
}