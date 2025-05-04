import {core} from "@tauri-apps/api";
import {RawJournal, Journal, toJournal} from "../models/types";

const get_journal = async (id: string): Promise<Journal> => {
    let j = await core.invoke<RawJournal>("get_journal", {id: id});
    return toJournal(j);
}

const get_journals = async (): Promise<Journal[]> => {
    let journals = await core.invoke<RawJournal[]>("get_journals");
    return journals.map((j) => toJournal(j));
}

const create_journal = async (title: string, content: string, rawcontent: String, tags: string[]): Promise<string> => {
    // returns a string with the id of the created journal
    return await core.invoke<string>("create_journal", {title: title, content: content,rawcontent: rawcontent, tags: tags.join(" ")});
}

const update_journal = async (id: string, title: string | null, content: string | null, rawcontent: string | null, tags: string[] | null): Promise<void> => {
    await core.invoke("update_journal", {id: id, title: title, content: content, rawcontent: rawcontent, tags: tags?.join(" ")});
}

const delete_journal = async (id: string): Promise<void> => {
    await core.invoke("delete_journal", {id: id});
}

export {
    get_journal,
    get_journals,
    create_journal,
    update_journal,
    delete_journal
}