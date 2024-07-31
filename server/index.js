const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); // Configures PostgreSQL pool

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// ROUTES


// Update server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});