require('dotenv').config(); // Load environment variables
const mysql = require('mysql2');

// Debugging: Check if environment variables are loaded properly
console.log("🔍 Checking environment variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "******" : "Not Set");
console.log("DB_NAME:", process.env.DB_NAME);

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error("❌ Missing required database environment variables! Check your .env file.");
  process.exit(1);
}

// Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Allows multiple connections
  queueLimit: 0,
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
    process.exit(1);
  } else {
    console.log("✅ Connected to MySQL database successfully!");
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = db;
