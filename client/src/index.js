import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProviderComponent from "./components/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProviderComponent>
        <App />
      </ThemeProviderComponent>
    </BrowserRouter>
  </React.StrictMode>
);
