import {event, core} from "@tauri-apps/api";

async function db_startup() {
    core.invoke("db_startup");

    let unl = await event.listen("db:ready", (event) => {
        console.log("Database startup event received:", event);
    });

    unl();

    await event.listen("db:error", (event) => {
        console.error("[DATABASE ERROR] : ", event);
    });
}

export {db_startup};