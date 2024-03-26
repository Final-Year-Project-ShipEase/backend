const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Vehicle = sequelize.define('vehicles', {
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
    driver_id: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    regNo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('Available', 'Intransit'),
    },
    location: {
      type: DataTypes.STRING,
    },
    trackerNo: {
      type: DataTypes.STRING,
    },
    ownerCnic: {
      type: DataTypes.STRING,
    },
    cost: {
      type: DataTypes.INTEGER,
    },
    width: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.STRING,
    },
  });

  Vehicle.associate = (models) => {
    Vehicle.hasMany(models.Booking, { foreignKey: 'vehicle_id' });
    Vehicle.belongsTo(models.Driver, { foreignKey: 'driver_id' });
    Vehicle.hasOne(models.VehicleApproval, { foreignKey: 'vehicle_id' });
  };
  return Vehicle;
};
