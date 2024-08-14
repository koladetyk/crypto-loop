import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.png'; 

const HomeScreen = () => (
  <div className="container text-center my-5">
    <img src={Logo} alt="CryptoLoop Logo" className="mb-4" style={{ maxWidth: '300px' }} />
    <h1 className="display-4 text-primary">Welcome to CryptoLoop</h1>
    <p className="lead text-muted">Social Trading on Blockchain</p>
    <div className="mt-5">
      <Link to="/register/trader" className="btn btn-primary btn-lg mx-3">
        Register as Trader
      </Link>
      <Link to="/register/copier" className="btn btn-secondary btn-lg mx-3">
        Register as Copier
      </Link>
    </div>
  </div>
);

export default HomeScreen;
