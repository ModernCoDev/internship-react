import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  let activeStyle = {
    backgroundColor: "#ccc",
    color: "#555",
  };

  return (
    <div>
      <li>
        <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          Signup
        </NavLink>
      </li>
    </div>
  );
};

export default SignedOutLinks;
