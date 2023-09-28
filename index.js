const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('./config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const models = {};
fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, 'models', file))(
      sequelize,
      Sequelize.DataTypes
    );
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize
  .authenticate()
  .then(async () => {
    console.log('Connected to the database.');

    await sequelize.sync({ alter: true });

    console.log('Migrations executed successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
