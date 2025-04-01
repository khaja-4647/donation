const bcrypt = require('bcryptjs');

// Function to generate a hashed password
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("🔑 Hashed Password:", hashedPassword);
};

// Replace 'admin123' with the actual password you want to hash
hashPassword('admin123');
