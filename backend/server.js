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
  res.send('Restaurant Management API is running');
});

//  new table creation
app.post('/api/tables', async (req, res) => {
  try {
    const { name, capacity } = req.body;
    
    if (!name || !capacity) {
      return res.status(400).json({ message: 'Name and capacity are required' });
    }
    
    // checking for table with same name if found will display a message and not create the table with same name

    const existingTable = await Table.findOne({ name });
    if (existingTable) {
      return res.status(400).json({ message: `Table with name '${name}' already exists` });
    }
    
    // creation of new table if condition false
    const newTable = new Table({
      name,
      capacity,
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

// displays all the tables
app.get('/api/tables', async (req, res) => {
  try {
    const tables = await Table.find().sort({ createdAt: -1 });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//delete table
app.delete('/api/tables/:name', async (req, res) => {
  try {
    const { name } = req.params;
    // cheking if table exists 
    const table = await Table.findOne({ name });
    if (!table) {
      return res.status(404).json({ message: `Table with name '${name}' not found` });
    }

    // table deletion
    await Table.deleteOne({ name });

    res.status(200).json({ message: `Table '${name}' deleted successfully` });
  } catch (error) {
    console.error('Error deleting table:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// update table route
app.put('/api/tables', async (req, res) => {
  try {
    const { currentName, newName, capacity } = req.body;

    // input validation
    if (!currentName) {
      return res.status(400).json({ message: 'Current table name is required' });
    }

    // Find the existing table
    const existingTable = await Table.findOne({ name: currentName });
    if (!existingTable) {
      return res.status(404).json({ message: `Table with name '${currentName}' not found` });
    }

    // Check if new name (if provided) is already taken
    if (newName && newName !== currentName) {
      const nameConflict = await Table.findOne({ name: newName });
      if (nameConflict) {
        return res.status(400).json({ message: `Table with name '${newName}' already exists` });
      }
    }

    // Update the table
    existingTable.name = newName || currentName;
    if (capacity !== undefined) {
      existingTable.capacity = capacity;
    }

    await existingTable.save();

    res.status(200).json({ 
      message: 'Table updated successfully',
      table: existingTable 
    });
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



//starting the server
app.listen(PORT, '192.168.29.132', () => {
  console.log(`Server running on port ${PORT}`);
});

