const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const DocumentDetail = sequelize.define('documentDetails', {
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // This enforces the one-to-one relationship
    },
    trackerNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerCnic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleReg: {
      type: DataTypes.BLOB,
    },

  });

  DocumentDetail.associate = (models) => {
    DocumentDetail.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id' });
  };
  return DocumentDetail;
};
