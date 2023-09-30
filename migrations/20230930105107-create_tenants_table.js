module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tenants', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNo: {
        type: Sequelize.INTEGER,
      },
      cities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      permissions: {
        type: Sequelize.JSON,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
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

    // Drop the Tenants table
    await queryInterface.dropTable('Tenants');
  },
};
