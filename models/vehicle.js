const { DataTypes } = require('sequelize');
const db = require('../config/config'); // Replace with the correct path to your Sequelize database configuration

const Vehicle = db.define('Vehicle', {
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
    type: DataTypes.GEOMETRY('POINT'),
  },
});

// Define associations to other models
Vehicle.hasMany(Booking, { foreignKey: 'vehicle_id' });
Vehicle.belongsTo(Driver, { foreignKey: 'driver_id' });
Vehicle.hasOne(DocumentDetail, { foreignKey: 'vehicle_id' });

module.exports = Vehicle;
