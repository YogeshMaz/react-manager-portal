import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProviderComponent from "./components/ThemeContext";

// Get the root element from the DOM
const container = document.getElementById("root");
const root = createRoot(container); 

// Render the application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProviderComponent>
        <App />
      </ThemeProviderComponent>
    </BrowserRouter>
  </React.StrictMode>
);
