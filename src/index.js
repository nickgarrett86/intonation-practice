import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/intonation-practice">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
