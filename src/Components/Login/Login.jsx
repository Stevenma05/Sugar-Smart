// src/Components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const existingUser = localStorage.getItem(`user-${username}`);
    if (existingUser) {
      setError('Username already exists. Please choose a different one.');
      return;
    }

    localStorage.setItem(`user-${username}`, JSON.stringify({ username, password }));
    setIsSigningUp(false);
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem(`user-${username}`));
    if (storedUser && storedUser.password === password) {
      setIsLoggedIn(username); // Pass username to App's login handler
      navigate('/');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <h2>{isSigningUp ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={isSigningUp ? handleSignup : handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSigningUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSigningUp(!isSigningUp)} className="toggle-button">
        {isSigningUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
      </button>
    </div>
  );
}

export default Login;
