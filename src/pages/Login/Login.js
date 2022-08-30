import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';

import classes from './Login.module.css';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <section className={classes.login}>
      <Card>
        <h1>Login</h1>
        <LoginForm />
        <div className={classes.link}>
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
      </Card>
      <div className={classes.link}>
        Don't have an account? <Link to="/signup">Sing up</Link>
      </div>
    </section>
  );
};

export default Login;
