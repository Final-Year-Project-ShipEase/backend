const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Complaint = sequelize.define('complaint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'resolved'),
    },
  });

  Complaint.associate = (models) => {
    Complaint.belongsTo(models.Admin, { foreignKey: 'admin_id' });
  };
  return Complaint;
};
