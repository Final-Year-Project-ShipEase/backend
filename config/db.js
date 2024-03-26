const { Sequelize } = require('sequelize');
const config = require('./config');
require('dotenv').config();

// Assuming NODE_ENV will be either 'development', 'test', or 'production'
const NODE_ENV = process.env.NODE_ENV || 'production';

let sequelize;

if (NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });
  console.log('Connected to production database');
  console.log('NODE_ENV:', process.env.DATABASE_URL);
} else {
  // For non-production environments or when DATABASE_URL is not used
  sequelize = new Sequelize({
    ...config[NODE_ENV],
    logging: false, // Optionally turn off Sequelize logging in development
  });
}

const DBConnection = sequelize;

module.exports = DBConnection;
