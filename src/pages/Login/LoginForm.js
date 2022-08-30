import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import useInput from '../../hooks/useInput';
import { login } from '../../services/reducers/userReducer';

import classes from './LoginForm.module.css';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const { value: enteredEmail, valueChangeHandler: emailChangeHandler } = useInput(() => {});

  const { value: enteredPassword, valueChangeHandler: passwordChangeHandler } = useInput(() => {});

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);
      const userAuth = await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid
        })
      );
      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/user-not-found' || 'auth/wrong-password') {
        setError('The email or password is incorrect.');
      } else {
        setError('Failed to login. Something went wrong.');
      }
    }

    setLoading(false);
  };

  return (
    <Fragment>
      {error && <div className={classes.alert}>{error}</div>}
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes['form-control']}>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={enteredEmail} onChange={emailChangeHandler} />
        </div>
        <div className={classes['form-control']}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={enteredPassword} onChange={passwordChangeHandler} />
        </div>
        <button disabled={loading} type="submit">
          Login
        </button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
