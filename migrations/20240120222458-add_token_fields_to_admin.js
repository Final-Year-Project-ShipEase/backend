'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('admins', 'token', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('admins', 'refreshToken', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('admins', 'token');
    await queryInterface.removeColumn('admins', 'refreshToken');
  },
};
