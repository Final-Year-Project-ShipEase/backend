const { Sequelize } = require('sequelize');

const { env } = require('../utils/constants');
const config = require('./config');
const { NODE_ENV } = env;

const DBConnection = new Sequelize(config[NODE_ENV]);

module.exports = DBConnection;
