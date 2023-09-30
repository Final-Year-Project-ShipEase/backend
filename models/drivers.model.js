const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Driver = sequelize.define('Driver', {
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

  // Define one-to-one association to the "Vehicles" model
  Driver.hasOne(Vehicle, { foreignKey: 'driver_id' });

  // Define one-to-many association to the "Security_Features" model
  Driver.hasMany(SecurityFeature, { foreignKey: 'driver_id' });
  Driver.hasMany(Review, { foreignKey: 'driver_id' });

  return Driver;
};
