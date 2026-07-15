const jwt = require('jsonwebtoken');

// Ký JWT với secret trong .env
const generateToken = (payload, expiresIn = '1h') =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

module.exports = { generateToken };
