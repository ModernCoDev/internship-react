import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  let activeStyle = {
    // backgroundColor: "#ccc",
    // color: "#555",
    borderBottom: "2px solid #ddd"
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
