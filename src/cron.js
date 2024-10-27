const fetchWhaleTransactions = require('./fetchWhaleTransactions'); 

let transactions = [];
let intervalId;
let currentInterval = 10000;

const getTransactions = () => transactions;

const startIntervalJob = (interval = currentInterval) => {
  currentInterval = interval;

  // Clear any existing interval to avoid overlapping intervals
  if (intervalId) clearInterval(intervalId);

  // Start a new interval with the updated interval time
  intervalId = setInterval(async () => {
    console.log("Fetching whale transactions...");
    transactions = await fetchWhaleTransactions();
    console.log("Whale Transactions updated:", transactions);
  }, currentInterval);

  console.log(`Cron job started with interval: ${currentInterval / 1000} seconds`);
};

const setCronInterval = (newInterval) => {
  console.log(`Updating cron interval to: ${newInterval / 1000} seconds`);
  startIntervalJob(newInterval);
};

module.exports = { startIntervalJob, setCronInterval, getTransactions };




