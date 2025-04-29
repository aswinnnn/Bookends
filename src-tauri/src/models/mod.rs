use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Journal {
    pub id: String,
    pub title: String,
    pub content: String,
    pub tags: String,
    pub created_at: String,
    pub updated_at: String,
}