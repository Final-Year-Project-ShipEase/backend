'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('drivers', 'licenseImage', {
      type: Sequelize.BLOB,
    });
    await queryInterface.addColumn('drivers', 'profileImage', {
      type: Sequelize.BLOB,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('drivers', 'licenseImage');
    await queryInterface.removeColumn('drivers', 'profileImage');
  },
};
