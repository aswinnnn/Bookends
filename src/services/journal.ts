import {core} from "@tauri-apps/api";
import {RawJournal, Journal} from "../models/types";

const get_journal = async (id: string): Promise<Journal> => {
    let j = await core.invoke<RawJournal>("get_journal", {id: id});
    return j.toJournal();
}

const get_journals = async (): Promise<Journal[]> => {
    let journals = await core.invoke<RawJournal[]>("get_journals");
    return journals.map((j) => j.toJournal());
}

const create_journal = async (title: string, content: string, tags: string[]): Promise<string> => {
    // returns a string with the id of the created journal
    return await core.invoke<string>("create_journal", {title: title, content: content, tags: tags.join(" ")});
}

const update_journal = async (id: string, title: string | null, content: string | null, tags: string[] | null): Promise<void> => {
    await core.invoke("update_journal", {id: id, title: title, content: content, tags: tags?.join(" ")});
}

export {
    get_journal,
    get_journals,
    create_journal,
    update_journal
}