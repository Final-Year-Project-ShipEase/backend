const { Sequelize } = require('sequelize');
const config = require('./config');
require('dotenv').config();

// Assuming NODE_ENV will be either 'development', 'test', or 'production'
const NODE_ENV = process.env.NODE_ENV || 'development';

let sequelize;

// Check if the environment is 'production' and if 'use_env_variable' is specified in the config
if (NODE_ENV === 'production' && config[NODE_ENV].use_env_variable) {
  // For Heroku or other production environments where DATABASE_URL is provided
  sequelize = new Sequelize(process.env[config[NODE_ENV].use_env_variable], {
    ...config[NODE_ENV],
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // For non-production environments or when DATABASE_URL is not used
  sequelize = new Sequelize({
    ...config[NODE_ENV],
    logging: false, // Optionally turn off Sequelize logging in development
  });
}

const DBConnection = sequelize;

module.exports = DBConnection;
