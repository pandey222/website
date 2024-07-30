const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const app = express();
app.use(bodyParser.json());

const redisClient = redis.createClient();

app.get('/api/flights', (req, res) => {
  redisClient.get('flights', (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(JSON.parse(data));
  });
});

app.post('/api/update_flight_status', (req, res) => {
  const { airline, flightNumber, status } = req.body;
  const updatedFlight = { airline, flightNumber, status };
  redisClient.get('flights', (err, data) => {
    if (err) return res.status(500).json({ error: err });
    const flights = JSON.parse(data);
    const index = flights.findIndex(f => f.flightNumber === flightNumber);
    if (index !== -1) {
      flights[index] = updatedFlight;
    } else {
      flights.push(updatedFlight);
    }
    redisClient.set('flights', JSON.stringify(flights));
    res.json({ message: 'Flight status updated' });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
