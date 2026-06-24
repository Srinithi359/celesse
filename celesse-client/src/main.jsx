import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#1a1f2e",
          color: "#fff",
          border: "1px solid #f5a623",
        },
      }}
    />
    <App />
  </StrictMode>
);