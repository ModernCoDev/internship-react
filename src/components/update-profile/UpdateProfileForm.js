import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { useAuth } from '../../contexts/AuthContext';

import classes from './UpdateProfileForm.module.css';

const UpdateProfileForm = () => {
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: enteredEmailChangeHandler,
    inputBlurHandler: enteredEmailBlurHandler
  } = useInput((value) => value.match(validRegex) || value.trim().length === 0);


  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: enteredPasswordChangeHandler,
    inputBlurHandler: enteredPasswordBlurHandler
  } = useInput((value) => value.trim().length > 5);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler
  } = useInput((value) => value === enteredPassword);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid && confirmPasswordIsValid) {
    formIsValid = true;
  }

  console.log(enteredEmailIsValid, enteredPasswordIsValid, confirmPasswordIsValid)

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (enteredPassword !== confirmPassword) {
      return;
    }

    if(!enteredEmailIsValid) return;

    const promises = [];
    if (enteredEmail.trim().length !== 0 && enteredEmail !== currentUser.email) {
      promises.push(updateEmail(enteredEmail));
    }

    if (confirmPassword) {
      promises.push(updatePassword(confirmPassword));
    }

    try {
      setLoading(true);
      setError('');
      await Promise.all(promises);
      navigate('/dashboard');
    } catch {
      setError('Failed to update account');
    }

    setLoading(false);
  };

  const emailInputClasses = enteredEmailHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];

  const passwordInputClasses = enteredPasswordHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const confirmPasswordInputClasses = confirmPasswordHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

    const placeholderToggle = (e) => {
      e.target.placeholder = currentUser.email;
    };

  return (
    <Fragment>
      {error && <div className={classes.alert}>{error}</div>}
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder={currentUser.email}
            onFocus={(e) => {e.target.placeholder = ""}}
            onChange={enteredEmailChangeHandler}
            onBlur={(e) => {enteredEmailBlurHandler(e); placeholderToggle(e);}}
            value={enteredEmail}
          />
          {enteredEmailHasError && <p className={classes['error-text']}>Please enter a valid email</p>}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Leave blank to keep the same"
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
            placeholder="Leave blank to keep the same"
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            value={confirmPassword}
          />
          {confirmPasswordHasError && <p className={classes['error-text']}>Passwords do not match</p>}
        </div>
        <button disabled={!formIsValid && !loading} type="submit">
          Update
        </button>
      </form>
    </Fragment>
  );
};

export default UpdateProfileForm;
