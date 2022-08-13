import { Fragment, useState } from 'react';
import Card from './ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import classes from './Dashboard.module.css';

const Dashboard = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <Fragment>
      <Card className={classes.profile}>
        <h1>Profile</h1>
        {error && <div className={classes.alert}>{error}</div>}
        <strong>Email: </strong>
        {currentUser.email}
        <Link className={classes['update-profile']} to="/update-profile">
          Update Profile
        </Link>
      </Card>
      <div className={classes.logout}>
        <button onClick={logoutHandler}>Log Out</button>
      </div>
    </Fragment>
  );
};

export default Dashboard;
