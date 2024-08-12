import React, { useState } from 'react';
import TraderList from './TraderList';

const CopierDashboard = () => {
  const [riskAmount, setRiskAmount] = useState('');

  const handleChange = (e) => {
    setRiskAmount(e.target.value);
  };

  const handleSetRisk = (e) => {
    e.preventDefault();
    // Set risk amount logic here
  };

  return (
    <div className="copier-dashboard">
      <TraderList />
      <form onSubmit={handleSetRisk}>
        <h2>Set Risk Amount Per Trade</h2>
        <input type="number" placeholder="Risk Amount" onChange={handleChange} />
        <button type="submit">Set Risk</button>
      </form>
    </div>
  );
};

export default CopierDashboard;
