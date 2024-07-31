// src/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import pool from './db'; // Import PostgreSQL pool

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
