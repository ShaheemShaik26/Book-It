// config/config.js
require('dotenv').config(); // Load environment variables from .env

module.exports = {
    jwtSecret: process.env.JWT_SECRET || "your_secret_key",  // Use env var, fallback for dev
};