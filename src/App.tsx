import { SetStateAction, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Routes, Route, useNavigate } from "react-router";
import Intro from "./components/Intro";
import Create from "./components/create/Create";
import Sidepanel from "./components/Sidepanel";
import { ThemeProvider } from "./ThemeContext";
import "./App.css";
import Settings from "./components/settings/Settings";
import About from "./components/about/About";
import { set } from "date-fns";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Use `null` to indicate loading state
  const navigate = useNavigate();
  const wallpaperUrl = "/src/assets/6.jpg";
  const [selected, setSelected] = useState<'home' | 'create'>('create');

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
    <ThemeProvider>
      <div
        className="app-container wallpaper bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${wallpaperUrl})`,
        }}
      >
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/create" element={<Create selected={selected} setSelected={setSelected} />} />
          <Route path="/settings" element={<Settings setSelected={setSelected}/>} />
          <Route path="/about" element={<About setSelected={setSelected}/>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;