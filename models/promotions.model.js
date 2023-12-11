const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Promotion = sequelize.define('promotions', {
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
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM('active', 'expired'),
    },
    phoneNo: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
  });

  Promotion.associate = (models) => {
    Promotion.belongsTo(models.Tenant, { foreignKey: 'tenant_id' });
  };
  return Promotion;
};
