import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New state to track loading

  useEffect(() => {
    // Check if there is a token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // User is logged in
    }
    setLoading(false); // Set loading to false after the check
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('token', 'your-token'); // Store the token or flag
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Clear the stored token
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
