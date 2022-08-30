import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  let activeStyle = {
    color: "#ccc",
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default SignedOutLinks;
