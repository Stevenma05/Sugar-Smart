// src/Components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => (
  <div className="home-container">
    <h1>Welcome to Sugar Smart</h1>
    <p>Log your blood sugar and view meal plans to stay healthy!</p>
    <div className="home-buttons">
      <Link to="/sugar-log">
        <button>Sugar Log</button>
      </Link>
      <Link to="/meal-log">
        <button>Meal Log</button>
      </Link>
    </div>
  </div>
);

export default Home;
