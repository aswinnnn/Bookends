import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import App from "./App";
import Header from "./components/Header";
import "./style.css";
import { ThemeProvider } from "./ThemeContext";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>

        <style>@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Lexend+Deca:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        </style>
        <Header />
        <br />
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>

      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);