import "@fontsource/inter";
import "@fontsource/montserrat";
import "@fontsource/orbitron";
import "@fontsource/outfit";

import "./theme.css";
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
