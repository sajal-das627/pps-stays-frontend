import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('pps-auth-token');
};

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
