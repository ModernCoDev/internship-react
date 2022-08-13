import './App.css';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/update-profile/UpdateProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
            <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
