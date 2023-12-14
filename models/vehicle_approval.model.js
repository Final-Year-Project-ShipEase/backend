const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const VehicleApproval = sequelize.define('vehicleApprovals', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission: {
      type: DataTypes.ENUM('approved', 'rejected'),
    },
    status: {
      type: DataTypes.ENUM('active', 'closed'),
    },
  });

  VehicleApproval.associate = (models) => {
    VehicleApproval.belongsTo(models.Vehicle, { foreignKey: 'driver_id' });
    VehicleApproval.belongsTo(models.Admin, { foreignKey: 'admin_id' });
    VehicleApproval.belongsTo(models.Tenant, { foreignKey: 'tenant_id' });
  };
  return VehicleApproval;
};
