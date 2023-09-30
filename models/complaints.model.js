const { DataTypes } = require('sequelize');
const db = require('../config/config'); // Replace with the correct path to your Sequelize database configuration
module.exports = (sequelize) => {
  const Complaint = sequelize.define('Complaint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'resolved'),
    },
  });

  return Complaint;
};
