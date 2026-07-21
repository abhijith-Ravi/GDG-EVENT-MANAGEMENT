import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    if (requiredRole && user?.usertype !== requiredRole) {
      navigate('/dashboard');
      return;
    }

    setIsAuthorized(true);
  }, [isAuthenticated, user, requiredRole, navigate]);

  if (!isAuthorized) {
    return null;
  }

  return children;
};
