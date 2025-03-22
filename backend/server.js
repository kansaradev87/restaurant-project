// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import the Table model from the models folder
const Table = require('./models/Table'); 

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant-project')
  .then(() => console.log('MongoDB connected to restaurant-project database'))
  .catch(err => console.log('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Restaurant Management API is running');
});

// Create a new table
app.post('/api/tables', async (req, res) => {
  try {
    const { name, capacity } = req.body;
    
    if (!name || !capacity) {
      return res.status(400).json({ message: 'Name and capacity are required' });
    }
    
    // Check if table with the same name already exists
    const existingTable = await Table.findOne({ name });
    if (existingTable) {
      return res.status(400).json({ message: `Table with name '${name}' already exists` });
    }
    
    // Create new table
    const newTable = new Table({
      name,
      capacity
    });
    
    await newTable.save();
    
    res.status(201).json({ 
      message: 'Table added successfully',
      table: newTable
    });
  } catch (error) {
    console.error('Error adding table:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all tables
app.get('/api/tables', async (req, res) => {
  try {
    const tables = await Table.find().sort({ createdAt: -1 });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});
