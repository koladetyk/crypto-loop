import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Grid, Typography, MenuItem } from '@mui/material';
import Header from './Header'; 
import axios from 'axios';

const RegisterTrader = () => {
  const [formData, setFormData] = useState({
    name: '',
    accountSize: '50K',
    email: '',
    phone: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/masterTraders/registerMasterTrader', formData);
      console.log(response.data);
      navigate("/dashboard/trader", { replace: true });
    } catch (error) {
      console.error("There was an error registering the trader!", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
  <Header /> 
  <div style={{ marginTop: '20px' }}></div>  
  <Typography variant="h4" component="h1" align="center" gutterBottom>
    Register as Trader
  </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Account Size"
              name="accountSize"
              variant="outlined"
              fullWidth
              value={formData.accountSize}
              onChange={handleChange}
              required
            >
              <MenuItem value="50000">50K</MenuItem>
              <MenuItem value="100000">100K</MenuItem>
              <MenuItem value="150000">150K</MenuItem>
              <MenuItem value="200000">200K</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phone"
              type="tel"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterTrader;
