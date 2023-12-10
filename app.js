// app.js
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env
const admin = require('./routes/admin');
const users = require('./routes/users');
const drivers = require('./routes/drivers');

const app = express();
const port = process.env.PORT || 12345;

// PostgresSQL configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client:', err.stack);
  }
  console.log('Connected to PostgresSQL database!');
  release();
});

app.use(express.json());
app.use(admin);
app.use(users);
app.use(drivers);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
