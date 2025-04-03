// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import the Table model from the models folder
const Table = require('./models/Table'); 
const tableRoutes = require('./routes/tableRoutes');
const Category =require('./models/Category');
const categoryRoutes=require('./routes/categoryRoutes');
const Item =require('./models/Item');
const itemRoutes=require('./routes/itemRoutes');
// const authRoutes=require('../auth/authRoutes');

// middleware
app.use(cors());
app.use(express.json());

// mongodb Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant-project')
  .then(() => console.log('MongoDB connected to restaurant-project database'))
  .catch(err => console.log('MongoDB connection error:', err));

// Root route
app.get("/", (req, res) => {
  res.send('restaurant api running');
});

// Mount the table routes
app.use('/api/tables', tableRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);
// app.use('/api/auth',authRoutes)

console.log('About to start server...');
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running on port ${PORT}`);
});
console.log('Server start attempted');