import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService'; // changed here

const ProtectedRoute = ({ children, role }) => {
  const user = AuthService.getCurrentAccount(); // changed here

  if (!user) return <Navigate to="/login" />;
  if (role && user.user_role_name !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
