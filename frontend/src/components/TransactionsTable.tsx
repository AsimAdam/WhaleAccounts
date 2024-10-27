import React from 'react';
import '../styles/TransactionsTable.css';
import { Transaction } from '../App';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => (
  <div className="table-container">
    {transactions.length === 0 ? (
      <div className="loading-message">Loading...</div>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Hash</th>
            <th>Amount</th>
            <th>Sender</th>
            <th>To</th>
            <th>Block Height</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.Transaction.Hash}</td>
              <td>{tx.Trade.Amount}</td>
              <td>{tx.Transaction.From}</td>
              <td>{tx.Transaction.To}</td>
              <td>{tx.Block.Number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default TransactionsTable;

