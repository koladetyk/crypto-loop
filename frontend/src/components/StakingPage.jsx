import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Container, TextField, Button, Typography } from '@mui/material';
import contractABI from '../abi/contractAbi.json';
import Header from './Header';

const StakingPage = () => {
  const [amount, setAmount] = useState('');
  const [stakingTime, setStakingTime] = useState('');

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const handleStakeTokens = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.stakeTokens(
        ethers.utils.parseEther(amount),  // Convert amount to Wei (assuming it's in Ether)
        stakingTime,
        true  // Replace with appropriate value for isMasterTrader or fetch it from your app state
      );

      await tx.wait();

      alert('Tokens staked successfully!');
    } catch (error) {
      console.error('Error staking tokens:', error);
      alert('An error occurred while staking tokens.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Header />
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Stake Tokens
      </Typography>
      <TextField
        label="Amount"
        name="amount"
        variant="outlined"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <TextField
        label="Staking Time (in days)"
        name="stakingTime"
        variant="outlined"
        fullWidth
        value={stakingTime}
        onChange={(e) => setStakingTime(e.target.value)}
        required
        style={{ marginTop: '10px' }}
      />
      <Button 
        variant="contained" 
        color="secondary" 
        fullWidth 
        onClick={handleStakeTokens} 
        style={{ backgroundColor: '', marginTop: '10px' }}
      >
        Stake Tokens
      </Button>
    </Container>
  );
};

export default StakingPage;
