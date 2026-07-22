import React, { createContext, useState, useEffect } from 'react';
import { authUtils } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = authUtils.getToken();
    const userData = authUtils.getUser();
    if (token && userData.username && userData.role) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, role, token, studentId) => {
    authUtils.setUser(username, role, token, studentId);
    setUser({ username, role, studentId: studentId ?? null });
    setIsAuthenticated(true);
  };

  const logout = () => {
    authUtils.clearUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setUser, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
