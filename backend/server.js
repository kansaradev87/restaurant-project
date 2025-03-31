// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import the Table model from the models folder
const Table = require('./models/Table'); 

// middleware
app.use(cors());
app.use(express.json());

// mongodb Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant-project')
  .then(() => console.log('MongoDB connected to restaurant-project database'))
  .catch(err => console.log('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Restaurant Management API is running',PORT);
});
