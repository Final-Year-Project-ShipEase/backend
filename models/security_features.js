const { DataTypes } = require('sequelize');
const db = require('../config/config'); // Replace with the correct path to your Sequelize database configuration

const SecurityFeature = db.define('SecurityFeature', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // This enforces the one-to-one relationship
  },
  driver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('QR', 'video'),
  },
  data: {
    type: DataTypes.JSON,
  },
});

// Define one-to-one association to the "Bookings" model
SecurityFeature.belongsTo(Booking, { foreignKey: 'booking_id' });

// Define many-to-one association to the "Drivers" model
SecurityFeature.belongsTo(Driver, { foreignKey: 'driver_id' });

module.exports = SecurityFeature;
