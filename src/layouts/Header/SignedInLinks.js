import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../../services/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';

import classes from './SignedInLinks.module.css';

const SignedInLinks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const logoutHandler = async () => {
    try {
      signOut(auth);
      dispatch(logout());
      navigate('/login');
    } catch {}
  };

  let activeStyle = {
    // backgroundColor: "#ccc",
    // color: "#555",
    borderBottom: "2px solid #ddd"
  };

  return (
    <div>
      <li>
        <NavLink to="/dashboard" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <button className={classes.logout} onClick={logoutHandler}>
          Log Out
        </button>
      </li>
    </div>
  );
};

export default SignedInLinks;
