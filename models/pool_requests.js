const { DataTypes } = require('sequelize');
const db = require('../config/config'); // Replace with the correct path to your Sequelize database configuration

const PoolRequest = db.define('Pool_Request', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  types: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  destination: {
    type: DataTypes.STRING,
  },
  startDate: {
    type: DataTypes.TIMESTAMP,
  },
  endDate: {
    type: DataTypes.TIMESTAMP,
  },
});

// Define association to the "Bookings" model
PoolRequest.belongsTo(Booking, { foreignKey: 'booking_id' });

module.exports = PoolRequest;
