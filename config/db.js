const { Sequelize } = require('sequelize');

const { env } = require('../utils/constants');
const config = require('./config');
const { NODE_ENV } = env;

let sequelize;
if (config[NODE_ENV].use_env_variable) {
  // For production environment, use the DATABASE_URL directly
  sequelize = new Sequelize(process.env[config[NODE_ENV].use_env_variable], config[NODE_ENV]);
} else {
  // For other environments, use the existing configuration
  sequelize = new Sequelize(config[NODE_ENV]);
}

const DBConnection = sequelize;


module.exports = DBConnection;
