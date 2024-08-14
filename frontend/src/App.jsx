import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import RegisterTrader from './components/RegisterTrader';
import RegisterCopier from './components/RegisterCopier';
import TraderDashboard from './components/TraderDashboard';
import CopierDashboard from './components/CopierDashboard';
import StakingPage from './components/StakingPage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/register/trader" element={<RegisterTrader />} />
        <Route path="/register/copier" element={<RegisterCopier />} />
        <Route path="/dashboard/trader" element={<TraderDashboard />} />
        <Route path="/dashboard/copier" element={<CopierDashboard />} />
        <Route path="/staking" element={<StakingPage />} />
      </Routes>
    </div>
  );
};

export default App;
