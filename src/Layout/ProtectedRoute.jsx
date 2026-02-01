import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return null; // or a loader
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;