const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const ShipmentVerification = sequelize.define('shipmentVerifications', {
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

  ShipmentVerification.associate = (models) => {
    ShipmentVerification.belongsTo(models.Booking, {
      foreignKey: 'booking_id',
    });
    ShipmentVerification.belongsTo(models.Driver, { foreignKey: 'driver_id' });
  };
  return ShipmentVerification;
};
