const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure environment variables are loaded

// Register a new user
const register = (req, res) => {
  console.log("📩 Received Registration Data:", req.body); // Log received data

  const { username, email, password, name, role } = req.body;
  const userRole = role || "user"; // Default role

  // Debugging: Check if any field is missing or undefined
  if (!username || !email || !password || !name || !userRole) {
    console.log("❌ Missing Fields:", { username, email, password, name, userRole });
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log("❌ Error hashing password:", err.message);
      return res.status(500).json({ error: 'Error hashing password' });
    }

    // Insert into database
    const query = 'INSERT INTO users (username, email, password, name, role) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [username, email, hash, name, userRole], (err, result) => {
      if (err) {
        console.log("❌ Error registering user:", err.message);
        return res.status(500).json({ error: 'Error registering user', details: err.message });
      }

      console.log("✅ User registered successfully:", { id: result.insertId, username, email, role: userRole });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Login a user (with role-based authentication)
const login = (req, res) => {
  console.log("🔍 Received Login Request:", req.body);

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    console.log("❌ Missing email, password, or role");
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err.message });

    if (result.length === 0) {
      console.log("❌ User not found");
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result[0];
    console.log("✅ User Found:", user);

    // Check if the provided password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the role matches the stored role
    if (user.role !== role) {
      console.log(`❌ Unauthorized access: Role mismatch (Expected: ${user.role}, Given: ${role})`);
      return res.status(403).json({ error: `Unauthorized access as ${role}` });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("✅ Login Successful");

    res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  });
};

// Forgot Password (Simulated)
const forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Simulate sending a password reset email
  console.log(`📩 Password reset email sent to: ${email}`);

  res.status(200).json({ message: 'Password reset instructions sent to your email.' });
};

module.exports = { register, login, forgotPassword };
