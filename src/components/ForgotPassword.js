import { useState } from 'react';
import useInput from '../hooks/useInput';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

import Card from '../components/ui/Card';

import classes from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { value: enteredEmail, valueChangeHandler: emailChangeHandler } = useInput(() => {});

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    try {
      setMessage("");
      setError('');
      setLoading(true);
      await resetPassword(enteredEmail);
      setMessage("Password reset email sent! Check your inbox for further information.");
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('There is no acount assigned to this email');
      } else {
        setError('Failed to reset password. Something went wrong.');
      }
    }

    setLoading(false);
  };

  return (
    <section className={classes["forgot-password"]}>
      <Card>
        <h1>Password Reset</h1>
        {error && <div className={classes.alert}>{error}</div>}
        {message && <div className={classes.message}>{message}</div>}
        <form className={classes.form} onSubmit={formSubmissionHandler}>
          <div className={classes['form-control']}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={enteredEmail} onChange={emailChangeHandler} />
          </div>
          <button disabled={loading} type="submit">
            Reset Password
          </button>
        </form>
        <div className={classes.link}>
          <Link to="/login">Login</Link>
        </div>
      </Card>
      <div className={classes.link}>
        Don't have an account? <Link to="/signup">Sing up</Link>
      </div>
    </section>
  );
};

export default ForgotPassword;
