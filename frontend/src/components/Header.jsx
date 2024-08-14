import React from 'react';
import Logo from './logo.png'; 

const Header = () => {
  return (
    <nav className="navbar">
      <img src={Logo} alt="CryptoLoop Logo" className="navbar-logo" />
    </nav>
  );
};

export default Header;
