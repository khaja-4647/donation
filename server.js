require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Correct if db.js is inside the config folder
const authRoutes = require('./routes/authRoutes'); // Authentication Routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging: Check if env variables are loaded correctly
console.log("✅ Server environment variables:");
console.log("PORT:", process.env.PORT || 5000);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "******" : "Not Set");

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
