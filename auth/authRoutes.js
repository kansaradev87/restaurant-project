    const express = require('express');
    const jwt = require('jsonwebtoken');
    const router = express.Router();

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;

    let isLoggedIn = false; // Ensure only one admin is logged in at a time

    // Admin Login Route
    router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (isLoggedIn) {
        return res.status(403).json({ message: 'Another user is already logged in' });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        isLoggedIn = true;
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
    });

    // Admin Logout Route
    router.post('/logout', (req, res) => {
    isLoggedIn = false;
    res.json({ message: 'Logged out successfully' });
    });

    module.exports = router;
