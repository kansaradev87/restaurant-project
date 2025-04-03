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
  qrCode: {
    type: String, // Stores the QR code URL for this table
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  order:{
    orderName:{
      type:String,
      default:""
    },
    orderQuantity:{
      type: Number,
      default: 0,
    },
    orderPrice:{
      type: Number,
      default:0,
    },
  }
});

// Create Table model
const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
