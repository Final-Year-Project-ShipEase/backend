const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const VehicleImages = sequelize.define('vehicleImages', {
    vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vehicleReg: {
        type: DataTypes.BLOB,
    },
    inspection: {
        type: DataTypes.BLOB,
    },
    vehiclePictures: {
        type: DataTypes.JSON,
    },
  });

  // Define associations to other models
  VehicleImages.associate = (models) => {
    VehicleImages.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id' });
  };
  return VehicleImages;
};
