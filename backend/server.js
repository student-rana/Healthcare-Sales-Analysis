const express = require('express');
const cors = require('cors');
const { getDashboardStats, getRecentOrders, getClients } = require('./data');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/api/dashboard/stats', (req, res) => {
  res.json(getDashboardStats());
});

app.get('/api/orders', (req, res) => {
  res.json(getRecentOrders());
});

app.get('/api/clients', (req, res) => {
  res.json(getClients());
});

app.put('/api/clients/:id', (req, res) => {
  const updatedClient = require('./data').updateClient(req.params.id, req.body);
  if (updatedClient) {
    res.json(updatedClient);
  } else {
    res.status(404).json({ error: 'Client not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
