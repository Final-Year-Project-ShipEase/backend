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
    endDate: {
      type: DataTypes.DATE,
    },
  });

  PoolRequest.associate = (models) => {
    PoolRequest.belongsTo(models.Booking, { foreignKey: 'booking_id' });
  };
  return PoolRequest;
};
