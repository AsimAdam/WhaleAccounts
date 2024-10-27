require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { router } = require('./routes');
const { startIntervalJob, setCronInterval } = require('./cron');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(router);

app.post('/api/set-interval', (req, res) => {
  const { interval } = req.body;
  console.log(`Received interval update request: ${interval}`);

  // Set new interval for the cron job and confirm update
  setCronInterval(interval);
  console.log(`Cron interval updated to ${interval / 1000} seconds`);
  res.send({ message: `Cron interval updated to ${interval} milliseconds` });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  startIntervalJob(); 
});
