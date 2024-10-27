import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IntervalControl from './components/IntervalControl';
import TransactionsTable from './components/TransactionsTable';
import { fetchTransactions } from './services/api';
import './styles/App.css';

export interface Transaction {
  Block: {
    Number: string;
    Time: string;
  };
  Trade: {
    Amount: string;
    AmountInUSD: string;
    Buyer: string;
    Seller: string;
    Currency: {
      SmartContract: string;
      Symbol: string;
    };
  };
  Transaction: {
    From: string;
    Hash: string;
    To: string;
  };
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [interval, setIntervalValue] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Function to fetch transactions and reset the countdown
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchTransactions();
      setTransactions(response.data);
      setLoading(false);
      if (interval) setCountdown(interval / 1000);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Fetch transactions on the initial render
  useEffect(() => {
    fetchData();
  }, []);

  // Update effect when interval changes
  useEffect(() => {
    if (interval === null) return; 
    fetchData(); 
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId); 
  }, [interval]);

  // Countdown effect
  useEffect(() => {
    if (countdown <= 0 || interval === null) return; 
    const countdownId = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(countdownId); 
  }, [countdown, interval]);

  return (
    <div className="App">
      <Header />
      <IntervalControl setIntervalValue={(value: number) => {
        const intervalMs = value * 1000; 
        setIntervalValue(intervalMs);
        setCountdown(value); 
      }} />

      {loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
            fontSize: '1.5rem',
            textAlign: 'center'
          }}
        >
          Transactions are loading...
        </div>
      ) : (
        <>
          <TransactionsTable transactions={transactions} />
          {interval && countdown > 0 && (
            <div
              style={{
                textAlign: 'center',
                marginTop: '15px',
                fontSize: '1rem'
              }}
            >
              Your transactions will refresh in {countdown} seconds.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
