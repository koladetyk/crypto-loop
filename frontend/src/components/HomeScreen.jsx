import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.png';
import Header from './Header';
import { Container } from '@mui/material';

const HomeScreen = () => (
  <div className="home-screen text-center" style={{ backgroundColor: 'white', color: '#333', minHeight: '100vh', padding: '20px' }}>
    <Container maxWidth="sm">
      <Header />
      <div className="container mt-5">
        <h1 className="display-4">Welcome to CryptoLoop</h1>
        <p className="lead">Social Trading on Blockchain</p>
        <div className="mt-4">
          <Link to="/register/trader" className="btn btn-primary btn-lg mx-3">
            Get Started as Trader
          </Link>
          <Link to="/register/copier" className="btn btn-success btn-lg mx-3">
            Get Started as Copier
          </Link>
        </div>
      </div>
    </Container>
  </div>
);

export default HomeScreen;
