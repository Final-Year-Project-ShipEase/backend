module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Broadcasts', {
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
  },

  down: async (queryInterface) => {

    // Drop the Broadcasts table
    await queryInterface.dropTable('Broadcasts');
  },
};
