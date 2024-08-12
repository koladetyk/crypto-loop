// src/components/TradeList.jsx
import React from 'react';

const TradeList = ({ trades }) => {
  return (
    <div className="trade-list">
      <h3>Trade List</h3>
      {trades.length === 0 ? (
        <p>No trades posted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Master Trade ID</th>
              <th>Entry Price</th>
              <th>Stop Price</th>
              <th>Profit</th>
              <th>Buy Side</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <tr key={index}>
                <td>{trade.masterTradeId}</td>
                <td>{trade.entryPrice}</td>
                <td>{trade.stopPrice}</td>
                <td>{trade.profit}</td>
                <td>{trade.isBuySide ? 'Yes' : 'No'}</td>
                <td>
                  <a
                    href={`https://polygonscan.com/tx/${trade.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Explorer
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TradeList;
