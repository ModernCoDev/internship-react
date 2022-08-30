import React from 'react';
import { NavLink } from 'react-router-dom';
import SingedOutLinks from './SignedOutLinks';

import classes from './Navbar.module.css';

const Navbar = () => {
  let activeStyle = {
    
  };

  return (
    <nav className={classes.navbar}>
      <ul>
        <li className={classes.logo}>
          <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            React-Internship
          </NavLink>
        </li>
        <div><SingedOutLinks /></div>
      </ul>
    </nav>
  );
};

export default Navbar;
