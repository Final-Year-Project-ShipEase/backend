// app.js
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env

const admin = require('./routes/admin');
const user = require('./routes/users');
const tenant = require('./routes/tenant');
const driver = require('./routes/drivers');
const driverDetail = require('./routes/driver_details')
const driverAppproval = require('./routes/driver_approvals');
const driverLicenseImage = require('./routes/driver_license_image');
const vehicle = require('./routes/vehicles');
const vehicleDetail = require('./routes/vehicle_details');
const vehicleApproval = require('./routes/vehicles_approval');
const vehicleImage = require('./routes/vehicle_images');
const chat = require('./routes/chats');
const broadcast = require('./routes/broadcasts');
const promotion = require('./routes/promotion');

const app = express();
const port = process.env.DB_PORT || 12345;

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

app.use(cors());
app.use(express.json());
app.use(admin);
app.use(user);
app.use(tenant);
app.use(driver);
app.use(driverDetail);
app.use(driverAppproval);
app.use(driverLicenseImage);
app.use(vehicle);
app.use(vehicleDetail);
app.use(vehicleApproval);
app.use(vehicleImage);
app.use(chat);
app.use(broadcast);
app.use(promotion);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
