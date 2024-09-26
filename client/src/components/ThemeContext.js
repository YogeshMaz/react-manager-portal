import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProviderComponent = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Get stored preference from localStorage, or default to false (light mode)
    return localStorage.getItem('darkMode') === 'true' || false;
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem('darkMode', !prevMode); // Store the new preference
      return !prevMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderComponent;
