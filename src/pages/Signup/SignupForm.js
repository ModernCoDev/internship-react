import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import useInput from '../../hooks/useInput';

import classes from './SignupForm.module.css';

const SignupForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.match(validRegex));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: enteredPasswordChangeHandler,
    inputBlurHandler: enteredPasswordBlurHandler,
  } = useInput((value) => value.trim().length > 5);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value === enteredPassword);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid && confirmPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    try {
      setError('');
      setLoading(true);
      await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
      navigate('/dashboard');
    } catch (error){
      if(error.code === "auth/email-already-in-use") {
        setError("This email is already in use")
      } else {
        setError('Failed to create an account');
      }
    }

    setLoading(false);
  };

  const emailInputClasses = emailHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];

  const passwordInputClasses = enteredPasswordHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const confirmPasswordInputClasses = confirmPasswordHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  return (
    <Fragment>
      {error && <div className={classes.alert}>{error}</div>}
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" onChange={emailChangeHandler} onBlur={emailBlurHandler} value={enteredEmail} />
          {emailHasError && <p className={classes['error-text']}>Please enter a valid email</p>}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={enteredPasswordChangeHandler}
            onBlur={enteredPasswordBlurHandler}
            value={enteredPassword}
          />
          {enteredPasswordHasError && (
            <p className={classes['error-text']}>Password must be at least 6 characters long</p>
          )}
        </div>
        <div className={confirmPasswordInputClasses}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            value={confirmPassword}
          />
          {confirmPasswordHasError && <p className={classes['error-text']}>Passwords do not match</p>}
        </div>
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
    </Fragment>
  );
};

export default SignupForm;
