const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Chat = sequelize.define('chat', {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conversation: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.ENUM('active', 'closed'),
    },
  });

  // Define associations to other models
  Chat.associate = (models) => {
    Chat.belongsTo(models.User, { foreignKey: 'user_id' });
    Chat.belongsTo(models.Tenant, { foreignKey: 'tenant_id' });
  };
  return Chat;
};
