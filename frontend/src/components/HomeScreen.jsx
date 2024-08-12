import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => (
  <div className="home-screen">
    <h1>Welcome to CryptoLoop</h1>
    <p>Choose an option to get started:</p>
    <Link to="/register/trader">Register as Trader</Link>
    <Link to="/register/copier">Register as Copier</Link>
  </div>
);

export default HomeScreen;
