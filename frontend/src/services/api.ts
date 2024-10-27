import axios from 'axios';
import { Transaction } from '../App';

const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setIntervalAPI = async (interval: number): Promise<void> => {
  console.log("Setting interval to:", interval);
  try {
    const response = await api.post('/api/set-interval', { interval });
    console.log("Interval set response:", response.data); 
  } catch (error) {
    console.error("Error setting interval:", error);
  }
};

export const fetchTransactions = async (): Promise<{ data: Transaction[] }> => {
  try {
    const response = await api.get('/api/whale-transactions');
    console.log("Fetched transactions:", response.data); 
    return response;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export default api;


