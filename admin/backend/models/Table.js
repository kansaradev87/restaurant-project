// models/Table.js
const mongoose = require("mongoose");

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
  status: {
    type: String,
    required: true,
    default: "Available",
  },
  qrCode: {
    type: String, // Stores the QR code URL for this table
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  orders: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item", // References the Item model
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      price: {
        type: Number,
        required: true, // Stores item price at the time of order
      },
    },
  ],
});

// Create Table model
const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
