import {useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Routes, Route, useNavigate } from "react-router";
import Intro from "./components/Intro";
import Create from "./components/create/Create";
import { useTheme } from "./ThemeContext";
import "./App.css";
import Settings from "./components/settings/Settings";
import About from "./components/about/About";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Use `null` to indicate loading state
  const navigate = useNavigate();
  const [selected, setSelected] = useState<'home' | 'create'>('create');
  const {themeMode} = useTheme();

  // Check login status on app load
  useEffect(() => {
    const checkLoginStatus = async () => {
      return setIsLoggedIn(false); // Set to null while checking
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

    isLoggedIn ? navigate("/create") : navigate("/intro");
  }, [isLoggedIn]);

  return (
      <div
        className={`app-container wallpaper bg-no-repeat bg-center bg-cover ${
          themeMode === "light" ? "bg-[lightTheme.wallpaperImage]" : "bg-[darkTheme.wallpaperImage]"
        } ${themeMode === "light" ? "bg-bookends-primary" : "bg-bookends-dark-primary"
        } ${themeMode === "light" ? "text-bookends-text" : "text-bookends-dark-text"
        } ${themeMode === "light" ? "border-bookends-secondary" : "border-bookends-dark-secondary"
        } ${themeMode === "light" ? "shadow-light" : "shadow-dark"
        } ${themeMode === "dark" ? "dark" : "light"}`}>
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/create" element={<Create selected={selected} setSelected={setSelected} />} />
          <Route path="/settings" element={<Settings setSelected={setSelected}/>} />
          <Route path="/about" element={<About setSelected={setSelected}/>} />
        </Routes>
      </div>
  );
}

export default App;