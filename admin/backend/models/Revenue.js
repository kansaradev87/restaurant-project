// models/Revenue.js
const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true
},
tableName: {
    type: String,
    required: true
},
orders: [{
    item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
    },
    itemName: {
    type: String,
    required: true
    },
    quantity: {
    type: Number,
    required: true,
    min: 1
    },
    price: {
    type: Number,
    required: true
    }
}],
total: {
    type: Number,
    required: true
},
paymentDate: {
    type: Date,
    default: Date.now
}
}, { timestamps: true });

module.exports = mongoose.model('Revenue', RevenueSchema);