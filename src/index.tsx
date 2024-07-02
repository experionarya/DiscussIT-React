import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./utils/authenticationHelper/authProvider";
import { initializeMsal } from "./utils/authenticationHelper/msalInstance";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const initializeApp = async () => {
  await initializeMsal();

  root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

initializeApp();

reportWebVitals();
