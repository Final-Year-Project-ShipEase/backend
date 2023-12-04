const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const VehicleApproval = sequelize.define('vehicleApproval', {
    vehicle_id: {
      type: DataTypes.INTEGER,
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
    premission: {
      type: DataTypes.ENUM('approved', 'rejected'),
    },
    status: {
      type: DataTypes.ENUM('active', 'closed'),
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  VehicleApproval.associate = (models) => {
    VehicleApproval.belongsTo(models.Vehicle, { foreignKey: 'driver_id' });
    VehicleApproval.belongsTo(models.Admin, { foreignKey: 'admin_id' });
    VehicleApproval.belongsTo(models.Tenant, { foreignKey: 'tenant_id' });
  };
  return VehicleApproval;
};
