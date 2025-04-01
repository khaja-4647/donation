const express = require('express');
const bcrypt = require('bcryptjs'); // Use bcryptjs for better compatibility
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Import database connection
require('dotenv').config(); // Load environment variables

const router = express.Router();

// 🔍 Debug: Log incoming requests
router.use((req, res, next) => {
  console.log(`🔍 ${req.method} request to ${req.url}`, req.body);
  next();
});

// ✅ Register Route (Supports Role-based Registration)
router.post('/register', async (req, res) => {
  const { username, email, password, name, role } = req.body;

  if (!username || !email || !password || !name || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password, name, role) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [username, email, hashedPassword, name, role], (err, result) => {
      if (err) {
        console.error("❌ Database Error:", err.message);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// ✅ Login Route (Supports Role-based Authentication)
router.post('/login', (req, res) => {
  console.log("🔍 Received Login Request:", req.body);

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    if (result.length === 0) {
      console.log("❌ User not found");
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result[0];
    console.log("✅ User Found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the provided role matches the database role
    if (user.role !== role) {
      console.log(`❌ Unauthorized access: Role mismatch (Expected: ${user.role}, Given: ${role})`);
      return res.status(403).json({ error: `Unauthorized access as ${role}` });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("✅ Login Successful");

    res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  });
});

module.exports = router;
