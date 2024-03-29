// app.js
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const admin = require('./routes/admin');
const user = require('./routes/users');
const tenant = require('./routes/tenant');
const driver = require('./routes/drivers');
const driverAppproval = require('./routes/driver_approvals');
const driverLicenseImage = require('./routes/driver_license_image');
const vehicle = require('./routes/vehicles');
const vehicleApproval = require('./routes/vehicles_approval');
const vehicleImage = require('./routes/vehicle_images');
const chat = require('./routes/chats');
const broadcast = require('./routes/broadcasts');
const promotion = require('./routes/promotion');
const authAdmin = require('./routes/authAdmin');
const authTenant = require('./routes/authTenant');
const booking = require('./routes/bookings');
const poolRequest = require('./routes/pool_requests')

const app = express();
const port = process.env.BACKEND_PORT || 3000;

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
app.use(driverAppproval);
app.use(driverLicenseImage);
app.use(vehicle);
app.use(vehicleApproval);
app.use(vehicleImage);
app.use(chat);
app.use(broadcast);
app.use(promotion);
app.use(authAdmin);
app.use(authTenant);
app.use(booking);
app.use(poolRequest);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
