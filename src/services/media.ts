import { invoke } from "@tauri-apps/api/core";

export interface Media {
  journal_id: string;
  customenabled: boolean;
  backgroundimage?: string;
  isbgenabled?: boolean;
  primary_color?: string;
  secondary_color?: string;
  text_color?: string;
  song?: string;
  font_title?: string;
  font_body?: string;
}

// Create a new media record
export async function createMedia(media: Media): Promise<void> {
  try {
    await invoke("create_media", {
      journalId: media.journal_id,
      customenabled: media.customenabled,
      backgroundimage: media.backgroundimage,
      isbgenabled: media.isbgenabled,
      primaryColor: media.primary_color,
      secondaryColor: media.secondary_color,
      textColor: media.text_color,
      song: media.song,
      fontTitle: media.font_title,
      fontBody: media.font_body,
    });
    console.log("Media created successfully");
  } catch (error) {
    console.error("Failed to create media:", error);
    throw error;
  }
}

// Update an existing media record
export async function updateMedia(media: Media): Promise<void> {
  try {
    await invoke("update_media", {
      journalId: media.journal_id,
      customenabled: media.customenabled,
      backgroundimage: media.backgroundimage,
      isbgenabled: media.isbgenabled,
      primaryColor: media.primary_color,
      secondaryColor: media.secondary_color,
      textColor: media.text_color,
      song: media.song,
      fontTitle: media.font_title,
      fontBody: media.font_body,
    });
    console.log("Media updated successfully");
  } catch (error) {
    console.error("Failed to update media:", error);
    throw error;
  }
}

// Delete a media record by journal_id
export async function deleteMedia(journalId: string): Promise<void> {
  try {
    await invoke("delete_media", { journalId });
    console.log("Media deleted successfully");
  } catch (error) {
    console.error("Failed to delete media:", error);
    throw error;
  }
}

// Get a single media record by journal_id
export async function getMedia(journalId: string): Promise<Media | null> {
  try {
    const media = await invoke<Media | null>("get_media", { journalId });
    console.log("Media fetched successfully:", media);
    return media;
  } catch (error) {
    console.error("Failed to fetch media:", error);
    throw error;
  }
}

// Get all media records
export async function getAllMedia(): Promise<Media[]> {
  try {
    const mediaList = await invoke<Media[]>("get_all_media");
    console.log("Media list fetched successfully:", mediaList);
    return mediaList;
  } catch (error) {
    console.error("Failed to fetch media list:", error);
    throw error;
  }
}