import React, { createContext, useState, useEffect } from 'react';
import { authUtils } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = authUtils.getUser();
    if (userData.username && userData.usertype) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    authUtils.clearUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout, setUser, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
