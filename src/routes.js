const express = require('express');
const { getTransactions } = require('./cron');
const fetchWhaleTransactions = require('./fetchWhaleTransactions'); 
const router = express.Router();

// Route to get the in-memory whale transactions
router.get('/api/whale-transactions', (req, res) => {
  const transactions = getTransactions();
  console.log("Sending transactions to frontend:", transactions); 
  res.json(transactions);
});

module.exports = { router, fetchWhaleTransactions };
