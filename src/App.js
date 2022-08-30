import { useEffect } from 'react';
import './App.css';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile/UpdateProfile';
import Navbar from './layouts/Header/Navbar';
import { useDispatch } from 'react-redux';
import { login, logout } from './services/reducers/userReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            uid: user.uid
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
