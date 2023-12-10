const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Tenant = sequelize.define('tenant', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      type: DataTypes.STRING,
    },
    cities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    permissions: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
    },
  });

  Tenant.associate = (models) => {
    Tenant.hasMany(models.Chat, { foreignKey: 'tenant_id' });
    Tenant.hasMany(models.Booking, { foreignKey: 'tenant_id' });
    Tenant.hasMany(models.Broadcast, { foreignKey: 'tenant_id' });
    Tenant.hasMany(models.Promotion, { foreignKey: 'tenant_id' });
  };
  return Tenant;
};
