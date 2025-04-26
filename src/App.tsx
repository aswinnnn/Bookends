import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Routes, Route, useNavigate, HashRouter } from "react-router";
import Intro from "./components/Intro";
import Create from "./components/create/Create";
import Sidepanel from "./components/Sidepanel";
import "./App.css";
import Settings from "./components/settings/Settings";
import About from "./components/about/About";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Use `null` to indicate loading state
  const navigate = useNavigate();

  // Check login status on app load
  useEffect(() => {
    const checkLoginStatus = async () => {
      return setIsLoggedIn(false);
      try {
        const response: boolean = await invoke("check_login_status");
        setIsLoggedIn(response);
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false); // Default to not logged in on error
      }
    };

    checkLoginStatus();
  }, []);

  // Navigate based on login status
  useEffect(() => {
    if (isLoggedIn === null) return; // Wait until login status is determined

    isLoggedIn ? navigate('/create') : navigate('/intro');
    console.log('bitch ahh im in this bitch')

  }, [isLoggedIn]);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/intro" element={<Intro />} />
        <Route path="/create" element={<Create />} />
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;