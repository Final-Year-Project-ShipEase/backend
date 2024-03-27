'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vehicles', 'image', {
      type: Sequelize.BLOB,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('vehicles', 'image');
  },
};
