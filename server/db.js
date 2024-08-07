require("dotenv").config(); // Load environment variables from .env file

const { Pool } = require("pg");

// Configure how to connect to database
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
});

module.exports = pool;
