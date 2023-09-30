const { DataTypes } = require('sequelize');
const db = require('../config/config'); // Replace with the correct path to your Sequelize database configuration

const Promotion = db.define('Promotion', {
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
  couponNo: {
    type: DataTypes.STRING,
  },
  validationTill: {
    type: DataTypes.TIMESTAMP,
  },
  status: {
    type: DataTypes.ENUM('active', 'expired'),
  },
  phoneNo: {
    type: DataTypes.INTEGER,
  },
  city: {
    type: DataTypes.STRING,
  },
});

// Define many-to-one association to the "Tenants" model
Promotion.belongsTo(Tenant, { foreignKey: 'tenant_id' });

module.exports = Promotion;
