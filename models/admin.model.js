const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Admin = sequelize.define('admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.JSON,
    },
  });

  Admin.associate = (models) => {
    Admin.hasMany(models.VehicleApproval, { foreignKey: 'admin_id' });
    Admin.hasMany(models.DriverApproval, { foreignKey: 'admin_id' });
  };
  return Admin;
};
