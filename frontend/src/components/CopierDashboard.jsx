import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Header from './Header';

const CopierDashboard = () => {
  const [copierId, setCopierId] = useState('');
  const [riskAmount, setRiskAmount] = useState('');
  const [traders, setTraders] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    // Fetch all master traders
    const fetchTraders = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/masterTraders/getAllMasterTraders');
        setTraders(response.data);
      } catch (error) {
        console.error("Error fetching traders", error);
      }
    };
    fetchTraders();
  }, []);

  const handleSetRisk = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/copiers/setRiskManagementPlan', {
        copierId,
        riskAmount,
      });
      console.log(response.data);
      setSnackbarMessage('Risk amount set successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error setting risk amount", error);
      setSnackbarMessage('Failed to set risk amount.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleFollowTrader = async (traderId) => {
    try {
        const response = await axios.post('http://localhost:5005/api/masterTraders/followMasterTrader', {
            masterTraderId: traderId,
            copierId: copierId, // Ensure you have copierId available in the component's state
        });

        if (response.status === 200) {
            setSnackbarMessage('Followed trader successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    } catch (error) {
        console.error("Error following trader", error);
        setSnackbarMessage('Failed to follow trader.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Header />
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Copier Dashboard
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Copier ID"
              name="copierId"
              variant="outlined"
              fullWidth
              value={copierId}
              onChange={(e) => setCopierId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Risk Amount"
              name="riskAmount"
              variant="outlined"
              fullWidth
              value={riskAmount}
              onChange={(e) => setRiskAmount(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="success" fullWidth onClick={handleSetRisk}>
              Set Risk Amount
            </Button>
          </Grid>
        </Grid>
      </form>
      
      <Typography variant="h6" component="h2" align="center" style={{ marginTop: '20px' }}>
        Follow Traders
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Trader Name</TableCell>
                <TableCell>Number of Trades</TableCell>
                <TableCell>Number of Copiers</TableCell>
                <TableCell>Follow</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {traders.map((trader) => (
                <TableRow key={trader._id}>
                  <TableCell>{trader.name}</TableCell>
                  <TableCell>{trader.tradeCount}</TableCell>
                  <TableCell>{trader.copierCount}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="success" onClick={() => handleFollowTrader(trader._id)}>
                      Follow
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CopierDashboard;
