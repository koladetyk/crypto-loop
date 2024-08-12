import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterCopier = () => {
  const [formData, setFormData] = useState({
    name: '',
    apiKey: '',
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
    navigate('/dashboard/copier')
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register as Copier</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="apiKey" placeholder="API Key" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterCopier;
