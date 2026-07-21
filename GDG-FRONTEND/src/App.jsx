import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { Events } from './pages/Events';
import { CreateEvent } from './pages/CreateEvent';
import { UpdateEvent } from './pages/UpdateEvent';
import { DeleteEvent } from './pages/DeleteEvent';

import './App.css';

function AppContent() {
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/create"
          element={
            <ProtectedRoute requiredRole="admin">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/update"
          element={
            <ProtectedRoute requiredRole="admin">
              <UpdateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/delete"
          element={
            <ProtectedRoute requiredRole="admin">
              <DeleteEvent />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
