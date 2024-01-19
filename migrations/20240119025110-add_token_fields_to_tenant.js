'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tenants', 'token', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('tenants', 'refreshToken', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tenants', 'token');
    await queryInterface.removeColumn('tenants', 'refreshToken');
  },
};
