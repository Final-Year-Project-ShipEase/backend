const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Complaint = sequelize.define('complaint', {
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
