import React from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

// Simple hydration without streaming
const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

ReactDOM.hydrateRoot(
  root,
  <React.StrictMode>
    <HydratedRouter />
  </React.StrictMode>
); 