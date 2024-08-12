import React from 'react';

const TradeList = ({ trades }) => (
  <div className="trade-list">
    <h3>Placed Trades</h3>
    <table>
      <thead>
        <tr>
          <th>Asset</th>
          <th>Direction</th>
          <th>Entry Price</th>
          <th>Stop Loss Price</th>
          <th>Take Profit Price</th>
          <th>Hash</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade, index) => (
          <tr key={index}>
            <td>{trade.assetName}</td>
            <td>{trade.isBuySide ? "Buy" : "Sell"}</td>
            <td>{trade.entryPrice}</td>
            <td>{trade.stopPrice}</td>
            <td>{trade.profit}</td>
            <td>{trade.txHash}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TradeList;
