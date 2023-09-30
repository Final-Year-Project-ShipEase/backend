const { DataTypes } = require('sequelize');
const db = require('../config/config'); // Replace with the correct path to your Sequelize database configuration

const DocumentDetails = db.define('DocumentDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // This enforces the one-to-one relationship
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // This enforces the one-to-one relationship
  },
  cnic: {
    type: DataTypes.STRING,
  },
  license: {
    type: DataTypes.BLOB,
  },
  inspection: {
    type: DataTypes.BLOB,
  },
  vehicleReg: {
    type: DataTypes.BLOB,
  },
  trackerNo: {
    type: DataTypes.STRING,
  },
});

// Define one-to-one association to the "Vehicles" model
DocumentDetails.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

// Define one-to-one association to the "Drivers" model
DocumentDetails.belongsTo(Driver, { foreignKey: 'driver_id' });

module.exports = DocumentDetails;
