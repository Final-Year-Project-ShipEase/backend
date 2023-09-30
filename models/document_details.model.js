const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const DocumentDetails = sequelize.define('DocumentDetails', {
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
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // This enforces the one-to-one relationship
    },
    cnic: {
      type: DataTypes.STRING,
    },
    license: {
      type: DataTypes.BLOB,
    },
    inspection: {
      type: DataTypes.BLOB,
    },
    vehicleReg: {
      type: DataTypes.BLOB,
    },
    trackerNo: {
      type: DataTypes.STRING,
    },
  });

  // Define one-to-one association to the "Vehicles" model
  DocumentDetails.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

  // Define one-to-one association to the "Drivers" model
  DocumentDetails.belongsTo(Driver, { foreignKey: 'driver_id' });

  return DocumentDetails;
};
