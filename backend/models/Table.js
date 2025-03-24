// models/Table.js
const mongoose = require('mongoose');

// Define the Table schema
const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  status:{
    type: String,
    required:true,
    default:"Available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Table model
const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
