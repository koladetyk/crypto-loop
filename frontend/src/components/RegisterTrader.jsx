import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from "react-router-dom";

const RegisterTrader = () => {
  const [formData, setFormData] = useState({
    name: '',
    accountSize: '50K',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to backend API
    
    navigate("/dashboard/trader", { replace: true });
    // navigate("/dashboard/trader");
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register as Trader</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <select name="accountSize" onChange={handleChange}>
        <option value="50K">50K</option>
        <option value="100K">100K</option>
        <option value="150K">150K</option>
        <option value="200K">200K</option>
      </select>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterTrader;
