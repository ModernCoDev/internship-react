import React from 'react';
import { NavLink } from 'react-router-dom';
import SingedOutLinks from './SignedOutLinks';

import classes from './Navbar.module.css';
import SignedInLinks from './SignedInLinks';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {isLoggedIn } = useSelector(state => state.user)

  return (
    <nav className={classes.navbar}>
      <ul>
        <li className={classes.logo}>
          <NavLink to="/" >
            React-Internship
          </NavLink>
        </li>
        {isLoggedIn ? <SignedInLinks /> : <SingedOutLinks />}
      </ul>
    </nav>
  );
};

export default Navbar;
