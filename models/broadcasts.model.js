const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Broadcast = sequelize.define('broadcasts', {
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
    content: {
      type: DataTypes.JSON,
    },
    date: {
      type: DataTypes.DATE,
    },
    phoneNo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
    },
  });

  // Define association to the "Tenants" model
  Broadcast.associate = (models) => {
    Broadcast.belongsTo(models.Tenant, { foreignKey: 'tenant_id' });
  };
  return Broadcast;
};
