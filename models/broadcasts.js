const { DataTypes } = require('sequelize');
const db = require('../config/config'); // Corrected the path to the config file

const Broadcast = db.define('Broadcast', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tenant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.JSON,
  },
  date: {
    type: DataTypes.TIMESTAMP,
  },
  phoneNo: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
  },
});

// Define association to the "Tenants" model
Broadcast.belongsTo(Tenant, { foreignKey: 'tenant_id' });

module.exports = Broadcast;
