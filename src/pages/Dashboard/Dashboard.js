import { Fragment, useState } from 'react';
import Card from '../../components/Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../../services/reducers/userReducer';

import classes from './Dashboard.module.css';

const Dashboard = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const auth = getAuth();

  const logoutHandler = async () => {
    setError('');

    try {
      signOut(auth);
      dispatch(logout())
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
