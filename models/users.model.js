const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
  });

  // Define associations to other models
  User.hasMany(Chats, { foreignKey: 'UserId' });
  User.hasMany(Bookings, { foreignKey: 'UserId' });

  return User;
};
