const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const DriverLicenseImages = sequelize.define('driverLicenseImages', {
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    license: {
      type: DataTypes.BLOB,
    },
    profilePicture: {
      type: DataTypes.BLOB,
    },
  });

  // Define associations to other models
  DriverLicenseImages.associate = (models) => {
    DriverLicenseImages.belongsTo(models.Driver, { foreignKey: 'driver_id' });
  };
  return DriverLicenseImages;
};
