import { Link } from 'react-router-dom';

import Card from '../ui/Card';

import classes from './Signup.module.css';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <section className={classes.signup}>
      <Card>
        <h1>Sign Up</h1>
        <SignupForm />
      </Card>
      <div className={classes.link}>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </section>
  );
};

export default Signup;
