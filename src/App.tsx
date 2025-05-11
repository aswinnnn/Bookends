import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Routes, Route, useNavigate } from "react-router";
import Intro from "./components/Intro";
import Create from "./components/create/Create";
import { useTheme } from "./ThemeContext";
import "./App.css";
import Settings from "./components/settings/Settings";
import About from "./components/about/About";
import { db_startup } from "./services/db";
import { SelectedProvider } from "./context/SelectedContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Use `null` to indicate loading state
  const navigate = useNavigate();
  const { themeMode, lightTheme, darkTheme } = useTheme();

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

    db_startup();
    checkLoginStatus();
  }, []);

  // Navigate based on login status
  useEffect(() => {
    if (isLoggedIn === null) return; // Wait until login status is determined

    isLoggedIn ? navigate("/create") : navigate("/intro");
  }, [isLoggedIn]);
  const lightw = lightTheme.wallpaperImage;
  const darkw = darkTheme.wallpaperImage;

  return (
    <SelectedProvider>
      <div
        className={`app-container wallpaper bg-no-repeat bg-center bg-cover ${
          themeMode === "light"  && lightTheme.isWallpaperEnabled && darkTheme.isWallpaperEnabled ? "bg-[" + lightw + "]" : "bg-[" + darkw + "]"
        } ${themeMode === "light" ? "bg-bookends-primary" : "bg-bookends-dark-primary"
        } ${themeMode === "light" ? "text-bookends-text" : "text-bookends-dark-text"
        } ${themeMode === "light" ? "border-bookends-secondary" : "border-bookends-dark-secondary"
        } ${themeMode === "light" ? "shadow-light" : "shadow-dark"
        } ${themeMode === "dark" ? "dark" : "light"}`}>
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/create" element={<Create />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </SelectedProvider>
  );
}

export default App;