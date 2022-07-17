import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
