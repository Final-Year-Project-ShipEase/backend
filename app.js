// app.js
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

const admin = require('./routes/admin');
const user = require('./routes/users');
const tenant = require('./routes/tenant');
const driver = require('./routes/drivers');
const chat = require('./routes/chats')

const app = express();
const port = process.env.PORT || 3000;

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
app.use(user);
app.use(tenant);
app.use(driver);
app.use(chat);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
