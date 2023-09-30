const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.JSON,
    },
  });

  return Admin;
};
