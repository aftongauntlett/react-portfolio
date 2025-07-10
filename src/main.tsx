import "@fontsource/inter"; // ✅ loads default 400 + fallback weights
import "@fontsource/montserrat";
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
