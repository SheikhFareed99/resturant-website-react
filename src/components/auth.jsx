import React, { useState } from 'react';
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    console.log('Login submitted:', { email, password });
    
    setError('');
    setEmail('');

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
          
          <div className="remember-forgot">
            
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
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