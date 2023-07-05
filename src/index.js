import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ArgonControllerProvider>
        <App />
    </ArgonControllerProvider>
  </BrowserRouter>
);
