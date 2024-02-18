import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const ProtectedRoute = ({ children }: any) => {
  const { authData }: any = useContext(AuthContext);

  if (!authData) {
    // If there is no auth data, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
};
export default ProtectedRoute;