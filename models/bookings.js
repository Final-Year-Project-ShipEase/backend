const { DataTypes } = require('sequelize');
const db = require('../config/config'); // Replace with the correct path to your Sequelize database configuration

const Booking = db.define('Booking', {
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pickup: {
    type: DataTypes.JSON,
  },
  dropoff: {
    type: DataTypes.JSON,
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'reserved'),
  },
  date: {
    type: DataTypes.TIMESTAMP,
  },
});

// Define associations to other models
Booking.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });
Booking.hasMany(PoolRequest, { foreignKey: 'booking_id' });
Booking.hasOne(SecurityFeature, { foreignKey: 'booking_id' });

module.exports = Booking;
