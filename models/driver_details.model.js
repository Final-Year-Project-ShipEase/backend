const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const DriverDetail = sequelize.define('driverDetails', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
    },
    cnic: {
      type: DataTypes.STRING,
    },
    liscence: {
      type: DataTypes.BLOB,
    },
    trackerNo: {
      type: DataTypes.STRING,
    },
  });

  DriverDetail.associate = (models) => {
    DriverDetail.belongsTo(models.Driver, { foreignKey: 'driver_id' });
  };
  return DriverDetail;
};
