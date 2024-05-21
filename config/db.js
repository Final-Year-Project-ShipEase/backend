const { Sequelize } = require('sequelize');
const config = require('./config');
require('dotenv').config();

// Assuming NODE_ENV will be either 'development', 'test', or 'production'
const NODE_ENV = process.env.NODE_ENV || 'production';

let sequelize;

  // For non-production environments or when DATABASE_URL is not used
  sequelize = new Sequelize({
    ...config[NODE_ENV]
  });


const DBConnection = sequelize;

module.exports = DBConnection;
