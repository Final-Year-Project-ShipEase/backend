const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Payment = sequelize.define('payment', {
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
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.TIMESTAMP,
    },
    total: {
      type: DataTypes.INTEGER,
    },
    received: {
      type: DataTypes.INTEGER,
    },
    remaining: {
      type: DataTypes.INTEGER,
    },
    source: {
      type: DataTypes.JSON,
    },
    account_no: {
      type: DataTypes.STRING,
    },
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Booking, { foreignKey: 'booking_id' });
  };
  return Payment;
};
