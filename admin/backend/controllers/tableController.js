const Table = require("../models/Table");
const QRCode = require("qrcode");

// Create Table & Generate QR Code Automatically
exports.createTable = async (req, res) => {
try {
    const { name, capacity } = req.body;

    if (!name || !capacity) {
    return res.status(400).json({ message: "Name and capacity are required" });
    }

    // Check if table name already exists
    const existingTable = await Table.findOne({ name });
    if (existingTable) {
    return res.status(400).json({ message: `Table '${name}' already exists` });
    }

    // Generate QR Code URL
    const qrCodeUrl = `http://localhost:5173/order/${name}`;
    const qrCodeData = await QRCode.toDataURL(qrCodeUrl);

    // Create and Save Table
    const newTable = new Table({ name, capacity, qrCode: qrCodeData });
    await newTable.save();

    res.status(201).json({ message: "Table added successfully", table: newTable });
} catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
}
};

// Get All Tables
exports.getAllTables = async (req, res) => {
    try {
    const tables = await Table.find()
        .populate('orders.item')  // Add this line to populate item references
        .sort({ createdAt: -1 });
    res.json(tables);
    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Table by ID
exports.deleteTable = async (req, res) => {
try {
    const { tableId } = req.params;
    const table = await Table.findById(tableId);

    if (!table) {
    return res.status(404).json({ message: "Table not found" });
    }

    await Table.findByIdAndDelete(tableId);
    res.status(200).json({ message: `Successfully deleted table '${table.name}'` });
} catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
}
};

// Update Table (Name & Capacity)
exports.updateTable = async (req, res) => {
try {
    const { tableId } = req.params;
    const { newName, capacity } = req.body;

    const table = await Table.findById(tableId);
    if (!table) {
    return res.status(404).json({ message: "Table not found" });
    }

    // Check if new name already exists
    if (newName && newName !== table.name) {
    const nameConflict = await Table.findOne({ name: newName });
    if (nameConflict) {
        return res.status(400).json({ message: `Table '${newName}' already exists` });
    }
    table.name = newName;
    }

    if (capacity !== undefined) {
    table.capacity = capacity;
    }

    await table.save();
    res.status(200).json({ message: "Table updated successfully", table });
} catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
}
};

// Generate QR Code (Manually)
exports.generateQrCode = async (req, res) => {
try {
    const { tableId } = req.params;
    const table = await Table.findById(tableId);

    if (!table) {
    return res.status(404).json({ message: "Table not found" });
    }

    // Generate QR Code URL
    const qrCodeUrl = `http://localhost:5173/order/${table.name}`;
    const qrCodeData = await QRCode.toDataURL(qrCodeUrl);

    table.qrCode = qrCodeData;
    await table.save();

    res.json({ qrCode: qrCodeData });
} catch (error) {
    console.error("QR Code Generation Error:", error);
    res.status(500).json({ message: "Failed to generate QR Code" });
}
};

exports.orderTable=async(req,res)=>{
    const { tableId } = req.params;
    const { items } = req.body; // Array of items ordered

    try {
    const table = await Table.findById(tableId);
    if (!table) return res.status(404).json({ message: "Table not found" });

    // Add items to the table's order list
    table.orders.push(...items);
    await table.save();

    res.json({ message: "Order placed successfully", orders: table.orders });
    } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
    }

}

exports.displayOrders=async (req,res)=>{
        try {
            const tablesWithOrders = await Table.find({ "orders.0": { $exists: true } }); 
            res.json(tablesWithOrders);
        } catch (error) {
            res.status(500).json({ message: "Error fetching orders", error });
        }
    }     
