const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Booking = sequelize.define('booking', {
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
      type: DataTypes.DATE,
    },
    total_bill: {
      type: DataTypes.INTEGER,
    },
  });

  // Define associations to other models
  Booking.associate = (models) => {
    Booking.belongsTo(models.Tenant, { foreignKey: 'tenant_id' });
    Booking.belongsTo(models.User, { foreignKey: 'user_id' });
    Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id' });
    Booking.hasMany(models.PoolRequest, { foreignKey: 'booking_id' });
    Booking.hasMany(models.Payment, { foreignKey: 'booking_id' });
    Booking.hasOne(models.ShipmentVerification, { foreignKey: 'booking_id' });
  };
  return Booking;
};
