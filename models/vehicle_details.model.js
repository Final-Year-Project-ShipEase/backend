const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const VehicleDetail = sequelize.define('vehicleDetails', {
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
    trackerNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerCnic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleReg: {
      type: DataTypes.BLOB,
    },
    inspection: {
      type: DataTypes.BLOB,
    },
  });

  VehicleDetail.associate = (models) => {
    VehicleDetail.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id' });
  };
  return VehicleDetail;
};
