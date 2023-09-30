const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const SecurityFeature = sequelize.define('securityFeature', {
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

  SecurityFeature.associate = (models) => {
    SecurityFeature.belongsTo(models.Booking, { foreignKey: 'booking_id' });
    SecurityFeature.belongsTo(models.Driver, { foreignKey: 'driver_id' });
  };
  return SecurityFeature;
};
