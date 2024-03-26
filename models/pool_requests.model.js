const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const PoolRequest = sequelize.define('poolRequest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    types: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    destination: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    width: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  });

  PoolRequest.associate = (models) => {
    PoolRequest.belongsTo(models.Booking, { foreignKey: 'booking_id' });
  };
  return PoolRequest;
};
