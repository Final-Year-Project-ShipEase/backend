module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('broadcasts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: {
        type: Sequelize.JSON,
      },
      date: {
        type: Sequelize.DATE,
      },
      phoneNo: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('broadcasts', {
      fields: ['tenant_id'],
      type: 'foreign key',
      name: 'fk_tenant_id',
      references: {
        table: 'tenants',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    // Remove foreign keys first
    await queryInterface.removeConstraint('chats', 'fk_tenant_id');

    // Drop the broadcasts table
    await queryInterface.dropTable('broadcasts');
  },
};
