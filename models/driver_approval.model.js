const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const DriverApproval = sequelize.define('driverApproval', {
    driver_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    premission: {
      type: DataTypes.ENUM('approved', 'rejected'),
    },
    status: {
      type: DataTypes.ENUM('active', 'closed'),
    },
  });

  DriverApproval.associate = (models) => {
    DriverApproval.belongsTo(models.Driver, { foreignKey: 'driver_id' });
    DriverApproval.belongsTo(models.Admin, { foreignKey: 'admin_id' });
    DriverApproval.belongsTo(models.Tenant, { foreignKey: 'tenant_id' });
  };
  return DriverApproval;
};
