import React from 'react';
import { useSelector } from 'react-redux/es/exports';

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  let { user, loading } = useSelector((state) => state.user);

  if(loading) return null;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
