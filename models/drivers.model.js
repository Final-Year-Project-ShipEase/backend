const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Driver = sequelize.define('driver', {
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
    'phone no': {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
    },
  });

  Driver.associate = (models) => {
    Driver.hasOne(models.Vehicle, { foreignKey: 'driver_id' });
    Driver.hasMany(models.SecurityFeature, { foreignKey: 'driver_id' });
    Driver.hasMany(models.Review, { foreignKey: 'driver_id' });
  };
  return Driver;
};
