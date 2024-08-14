import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { ethers } from 'ethers';
import contractABI from '../abi/contractAbi.json';
import Header from './Header';

const TraderDashboard = () => {
  const [tradeDetails, setTradeDetails] = useState({
    assetName: '',
    masterTradeId: '', 
    entryPrice: '',
    stopPrice: '',
    profit: '',
    isBuySide: true 
  });

  const [trades, setTrades] = useState([]);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTradeDetails({
      ...tradeDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePlaceTrade = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
  
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const { assetName, masterTradeId, entryPrice, stopPrice, profit, isBuySide } = tradeDetails;

      // Convert prices to integers by multiplying by 100 (assuming 2 decimal places)
      const entryPriceInt = ethers.BigNumber.from(Math.round(entryPrice * 100));
      const stopPriceInt = ethers.BigNumber.from(Math.round(stopPrice * 100));
      const profitInt = ethers.BigNumber.from(Math.round(profit * 100));

      // Hash the ObjectId and convert it to a BigNumber
      const masterTradeIdHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(masterTradeId));
      const numericMasterTradeId = ethers.BigNumber.from(masterTradeIdHash);
  
      const tx = await contract.storeTradeData(
        numericMasterTradeId,
        entryPriceInt,
        stopPriceInt,
        profitInt,
        isBuySide
      );
  
      const txHash = tx.hash;
  
      await tx.wait();

      setTrades([
        ...trades,
        {
          assetName,
          masterTradeId,
          entryPrice,
          stopPrice,
          profit,
          isBuySide,
          txHash
        }
      ]);

      alert('Trade stored successfully!');
      
      try {
        const response = await axios.post('http://localhost:5005/api/trades/saveTrade', {
          asset: assetName,
          direction: isBuySide ? 'buy' : 'sell',
          entryPrice,
          stopLossPrice: stopPrice,
          takeProfitPrice: profit,
          masterTraderId: masterTradeId
        });

        const savedTrade = response.data;

        alert('Trade stored successfully in the backend!');
        setTrades([...trades, savedTrade]);
      } catch (error) {
        console.error('Error saving trade to backend:', error);
        alert('An error occurred while saving the trade data to the backend.');
      }
      
    } catch (error) {
      console.error('Error placing trade:', error);
      alert('An error occurred while placing the trade.');
    }
  };

  const fetchTrades = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/trades/getTradesByMasterTraderId/${tradeDetails.masterTradeId}`);
      setTrades(response.data);
    } catch (error) {
      console.error('Error fetching stored trades:', error);
    }
  };

  useEffect(() => {
    if (tradeDetails.masterTradeId) {
      fetchTrades();
    }
  }, [tradeDetails.masterTradeId]);

  const handleCopyTrades = async () => {
    try {
      const response = await axios.post('http://localhost:5005/api/copiers/copyTrades', {
        masterTraderId: tradeDetails.masterTradeId
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error copying trades:', error);
      alert('An error occurred while copying the trades.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Header />
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Store Trade Data
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Master Trade ID"
              name="masterTradeId"
              variant="outlined"
              fullWidth
              value={tradeDetails.masterTradeId}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Asset Name"
              name="assetName"
              variant="outlined"
              fullWidth
              value={tradeDetails.assetName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Entry Price"
              name="entryPrice"
              variant="outlined"
              fullWidth
              value={tradeDetails.entryPrice}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Stop Price"
              name="stopPrice"
              variant="outlined"
              fullWidth
              value={tradeDetails.stopPrice}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Profit"
              name="profit"
              variant="outlined"
              fullWidth
              value={tradeDetails.profit}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isBuySide"
                  checked={tradeDetails.isBuySide}
                  onChange={handleChange}
                />
              }
              label="Buy Side"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handlePlaceTrade}>
              Store Trade Data
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleCopyTrades}>
              Copy Trades to All Copiers
            </Button>
          </Grid>
        </Grid>
      </form>
      
      <Typography variant="h5" component="h2" align="center" style={{ marginTop: '20px' }}>
        Stored Trades
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Direction</TableCell>
              <TableCell>Entry Price</TableCell>
              <TableCell>Stop Loss Price</TableCell>
              <TableCell>Take Profit Price</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((trade, index) => (
              <TableRow key={index}>
                <TableCell>{trade.asset}</TableCell>
                <TableCell>{trade.direction}</TableCell>
                <TableCell>{trade.entryPrice}</TableCell>
                <TableCell>{trade.stopLossPrice}</TableCell>
                <TableCell>{trade.takeProfitPrice}</TableCell>
                <TableCell>{new Date(trade.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <a href="/staking" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary" fullWidth style={{ backgroundColor: '', marginTop: '100px' }}>
          Go to Staking
        </Button>
      </a>
    </Container>
  );
};

export default TraderDashboard;
