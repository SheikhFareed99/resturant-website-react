import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './auth.css';
import { useDispatch } from 'react-redux';
import { setCustomerId } from '../stores/userSlice'; 

const Login = () => {
  const [userType, setUserType] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (userType === 'customer') {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/login', {
          Email: email,
          PasswordHash: password
        });

        if (response.data.message > 0) {
          dispatch(setCustomerId(response.data.message));
          navigate('/home');
        } else {
          setError('Invalid Email or Password');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('Login failed. Please try again.');
      }
    } 
    else if (userType === 'admin') {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/loginadmin', {
          Email: email,
          PasswordHash: password
        });

        if (response.data.message > 0) {
          navigate('/manager');
        } else {
          setError('Invalid Admin Credentials');
        }
      } catch (err) {
        console.error('Admin login error:', err);
        setError('Admin login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="brand-header">
          <h1>Grubify</h1>
          <p>Welcome back to your favorite dining experience</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">Login as</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              style={{ borderRadius: '5px', padding: '5px', marginBottom: '10px' }}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

       

          <button type="submit" className="login-button">Log In</button>
        </form>

        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
