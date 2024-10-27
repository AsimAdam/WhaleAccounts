import React, { useState } from 'react';
import { setIntervalAPI } from '../services/api';
import '../styles/IntervalControl.css';

interface IntervalControlProps {
  setIntervalValue: (value: number) => void;
}

const IntervalControl: React.FC<IntervalControlProps> = ({ setIntervalValue }) => {
  const [inputValue, setInputValue] = useState<number>(1);

  const handleSetInterval = async () => {
    const newInterval = inputValue * 60 * 1000;
    try {
      await setIntervalAPI(newInterval);
      setIntervalValue(newInterval / (60 * 1000)); 
      alert(`Interval updated to ${inputValue} minutes.`);
    } catch (error) {
      console.error("Error setting interval:", error);
      alert("Failed to update interval.");
    }
  };

return (
  <div className="interval-control">
    <label htmlFor="interval-input" className="interval-label">Enter the interval in seconds</label>
    <div className="input-button-wrapper">
      <input
        id="interval-input"
        type="number"
        className="interval-input"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        placeholder="Enter interval (minutes)"
      />
      <button className="interval-button" onClick={handleSetInterval}>
        Set Interval
      </button>
    </div>
  </div>
);

}

export default IntervalControl;

