const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Promotion = sequelize.define('Promotion', {
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
    couponNo: {
      type: DataTypes.STRING,
    },
    validationTill: {
      type: DataTypes.TIMESTAMP,
    },
    status: {
      type: DataTypes.ENUM('active', 'expired'),
    },
    phoneNo: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
  });

  // Define many-to-one association to the "Tenants" model
  Promotion.belongsTo(Tenant, { foreignKey: 'tenant_id' });

  return Promotion;
};
