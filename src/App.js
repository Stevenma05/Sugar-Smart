// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import SugarLog from './Components/SugarLog/SugarLog';
import MealLog from './Components/MealLog/MealLog';
import Login from './Components/Login/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Retrieve login state from localStorage when the app loads
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (loggedIn && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem('username', username); // Store username in localStorage
    localStorage.setItem('isLoggedIn', 'true'); // Store login state in localStorage
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | <Link to="/sugar-log">Sugar Log</Link> |{' '}
          <Link to="/meal-log">Meal Log</Link> |{' '}
          {isLoggedIn ? <span>Welcome, {username}</span> : <Link to="/login">Login</Link>}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/sugar-log"
            element={
              isLoggedIn ? <SugarLog username={username} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/meal-log"
            element={isLoggedIn ? <MealLog /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
