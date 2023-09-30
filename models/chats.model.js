const { DataTypes } = require('sequelize');

const Chat = db.define('Chat', {
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
Chat.belongsTo(User, { foreignKey: 'user_id' });
Chat.belongsTo(Tenant, { foreignKey: 'tenant_id' });

module.exports = Chat;
