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
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
    },
    city: {
      type: DataTypes.STRING,
    },
    cnic: {
      type: DataTypes.STRING,
    },
    trackerNo: {
      type: DataTypes.STRING,
    },
    profileImage: {
      type: DataTypes.BLOB,
    },
    licenseImage: {
      type: DataTypes.BLOB,
    },
  });

  Driver.associate = (models) => {
    Driver.belongsTo(models.Tenant, { foreignKey: 'tenant_id' });
    Driver.hasOne(models.Vehicle, { foreignKey: 'driver_id' });
    Driver.hasMany(models.ShipmentVerification, { foreignKey: 'driver_id' });
    Driver.hasMany(models.Review, { foreignKey: 'driver_id' });
  };
  return Driver;
};
