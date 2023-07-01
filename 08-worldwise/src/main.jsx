import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Vite doens't comes with eslint so we have to manually config it
// npm install  eslint vite-plugin-eslint eslint-config-react-app --save-dev
