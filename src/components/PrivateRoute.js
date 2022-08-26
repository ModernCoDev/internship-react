import React from 'react';
import { useSelector } from 'react-redux/es/exports';

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector(state => state.user.user);

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
