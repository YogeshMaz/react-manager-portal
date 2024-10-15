// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import LoginPage from './pages/Authentication/Login';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProviderComponent from "./components/ThemeContext";
import { AuthProvider } from './pages/Authentication/AuthContext'; // Import AuthProvider

const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded";
link.rel = "stylesheet";
document.head.appendChild(link);

const container = document.getElementById("root");
const root = createRoot(container); 

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Wrap with AuthProvider */}
        <ThemeProviderComponent>
          <App />
        </ThemeProviderComponent>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
