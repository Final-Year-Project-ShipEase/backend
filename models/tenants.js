const { DataTypes } = require('sequelize');
const db = require('../config/database'); // Replace with your Sequelize database configuration

const Tenant = db.define('Tenant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  'phone no': {
    type: DataTypes.INTEGER,
  },
  cities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  permissions: {
    type: DataTypes.JSON,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
  },
});

// Define associations to other models
Tenant.hasMany(Chat, { foreignKey: 'tenant_id' });
Tenant.hasMany(Booking, { foreignKey: 'tenant_id' });
Tenant.hasMany(Broadcast, { foreignKey: 'tenant_id' });
Tenant.hasMany(Promotion, { foreignKey: 'tenant_id' });

module.exports = Tenant;
