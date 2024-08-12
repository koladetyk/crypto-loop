// src/components/TraderDashboard.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import TradeList from './TradeList';

import contractABI from '../abi/contractAbi.json'; // Ensure this points to your contract's ABI JSON

const TraderDashboard = () => {
  const [tradeDetails, setTradeDetails] = useState({
    assetName:'',
    masterTradeId: '', // Add masterTradeId to your state
    entryPrice: '',
    stopPrice: '',
    profit: '',
    isBuySide: true // Default value for buy side
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

      // Create a contract instance
      const contract = new ethers.Contract("0xd98df4f1e32eb48a6206207253396731b8a4c0a0", contractABI, signer);

      const { assetName, masterTradeId, entryPrice, stopPrice, profit, isBuySide } = tradeDetails;

      // Call the smart contract function
      const tx = await contract.storeTradeData(
        ethers.BigNumber.from(masterTradeId),
        entryPrice,
        stopPrice,
        profit,
        isBuySide
      );

      const txHash = tx.hash;

      // Wait for the transaction to be mined
      await tx.wait();
      alert('Trade stored successfully!');
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

      
    } catch (error) {
      console.error('Error placing trade:', error);
      alert('An error occurred while placing the trade.');
    }
  };

  return (
    <div className="trader-dashboard">
    <h2>Store Trade Data</h2>
    <input
      type="text"
      name="masterTradeId"
      placeholder="Master Trade ID"
      value={tradeDetails.masterTradeId}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="assetName"
      placeholder="Asset Name"
      value={tradeDetails.assetName}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="entryPrice"
      placeholder="Entry Price"
      value={tradeDetails.entryPrice}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="stopPrice"
      placeholder="Stop Price"
      value={tradeDetails.stopPrice}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="profit"
      placeholder="Profit"
      value={tradeDetails.profit}
      onChange={handleChange}
      required
    />
    <label>
      <input
        type="checkbox"
        name="isBuySide"
        checked={tradeDetails.isBuySide}
        onChange={handleChange}
      />
      Buy Side
    </label>
    <button onClick={handlePlaceTrade}>Store Trade Data</button>

    <TradeList trades={trades} />
  </div>

  );
};

export default TraderDashboard;
