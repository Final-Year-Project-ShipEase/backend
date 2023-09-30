const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Payment = sequelize.define('Payment', {
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
      unique: true, // This enforces the one-to-one relationship
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

  // Define one-to-one association to the "Bookings" model
  Payment.hasOne(Booking, { foreignKey: 'booking_id' });

  // Define many-to-one association to the "Tenants" model
  Payment.belongsTo(Tenant, { foreignKey: 'tenant_id' });

  return Payment;
};
