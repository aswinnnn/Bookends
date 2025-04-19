import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import Intro from "./components/Intro";
import "./App.css";
import Sidepanel from "./components/Sidepanel";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
  <>
  <Sidepanel />
  <Intro />
  </>
  );
}

export default App;
