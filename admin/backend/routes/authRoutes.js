const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

let activeTokens = new Set(); // Store active tokens

// Admin Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        activeTokens.add(token);
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// Admin Logout Route
router.post('/logout', (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token && activeTokens.has(token)) {
        activeTokens.delete(token); // Remove token from active sessions
        return res.json({ message: 'Logged out successfully' });
    }
    
    res.status(400).json({ message: 'Invalid token or already logged out' });
});

module.exports = router;
