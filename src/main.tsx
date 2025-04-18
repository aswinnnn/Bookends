import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/Header";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <link rel="stylesheet" href="/src/style.css" />
    <Header/>
    <br />
    <App />
  </React.StrictMode>,
);
