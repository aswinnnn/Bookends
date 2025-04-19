import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import Intro from "./components/Intro";
import "./App.css";
import Sidepanel from "./components/Sidepanel";
import Create from "./components/create/Create";
import { useNavigate } from "react-router";
import { redirect } from "./utils";

function App() {
  // Checks if this is the first time the user is using the app
  // If it is, show the intro screen
  // If not, show the create screen
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response: boolean = await invoke("check_login_status");
  //       setIsLoggedIn(response);
  //     } catch (error) {
  //       console.error("Error checking login status:", error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return (
  <>
  {isLoggedIn ? redirect('/create') : redirect('/intro')}
  </>
  );
}

export default App;
