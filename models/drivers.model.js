const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Driver = sequelize.define('drivers', {
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
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    phoneNo: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
    },
  });

  Driver.associate = (models) => {
    Driver.hasOne(models.Vehicle, { foreignKey: 'driver_id' });
    Driver.hasOne(models.DriverDetail, { foreignKey: 'driver_id' });
    Driver.hasMany(models.ShipmentVerification, { foreignKey: 'driver_id' });
    Driver.hasMany(models.Review, { foreignKey: 'driver_id' });
  };
  return Driver;
};
