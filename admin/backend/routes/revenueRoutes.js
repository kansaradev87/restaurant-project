// routes/revenue.js
const express = require('express');
const router = express.Router();
const Revenue = require('../models/Revenue');
const Table = require('../models/Table');
const Item = require('../models/Item');

// Process payment and create revenue record
router.post('/process-payment', async (req, res) => {
try {
    const { tableId, orders, total } = req.body;
    
    // Find the table to get its name
    const table = await Table.findById(tableId);
    if (!table) {
    return res.status(404).json({ success: false, message: 'Table not found' });
    }
    
    // Create normalized orders with item names
    const normalizedOrders = await Promise.all(orders.map(async (order) => {
    let itemId = order.item;
    let itemName;
    
    // Handle if order.item is already an object
    if (typeof order.item === 'object' && order.item !== null) {
        itemId = order.item._id;
        itemName = order.item.name;
    } else {
        // Find item by ID to get its name
        const item = await Item.findById(itemId);
        itemName = item ? item.name : `Item #${itemId}`;
    }
    
    return {
        item: itemId,
        itemName,
        quantity: order.quantity,
        price: order.price
    };
    }));
    
    // Create revenue record
    const revenue = new Revenue({
    tableId,
    tableName: table.name,
    orders: normalizedOrders,
    total
    });
    
    await revenue.save();
    
    // Clear the table's orders
    table.orders = [];
    table.status = 'Available';
    await table.save();
    
    res.status(200).json({ 
    success: true, 
    message: 'Payment processed successfully', 
    data: revenue 
    });
    
} catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ 
    success: false, 
    message: 'Error processing payment', 
    error: error.message 
    });
}
});

// Get all revenue records
router.get('/', async (req, res) => {
try {
    const revenues = await Revenue.find().sort({ paymentDate: -1 });
    res.status(200).json(revenues);
} catch (error) {
    console.error('Error fetching revenue records:', error);
    res.status(500).json({ 
    success: false, 
    message: 'Error fetching revenue records', 
    error: error.message 
    });
}
});

// Get revenue by date range
router.get('/range', async (req, res) => {
try {
    const { startDate, endDate } = req.query;
    
    const query = {};
    if (startDate && endDate) {
    query.paymentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
    };
    }
    
    const revenues = await Revenue.find(query).sort({ paymentDate: -1 });
    
    // Calculate total revenue
    const totalRevenue = revenues.reduce((sum, record) => sum + record.total, 0);
    
    res.status(200).json({
    success: true,
    data: revenues,
    count: revenues.length,
    totalRevenue
    });
    
} catch (error) {
    console.error('Error fetching revenue by date range:', error);
    res.status(500).json({ 
    success: false, 
    message: 'Error fetching revenue by date range', 
    error: error.message 
    });
}
});

module.exports = router;