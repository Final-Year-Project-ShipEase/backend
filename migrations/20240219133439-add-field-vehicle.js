// add the fields of cost , width and height to the vehicles table

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vehicles', 'cost', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('vehicles', 'width', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('vehicles', 'height', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('vehicles', 'cost');
    await queryInterface.removeColumn('vehicles', 'width');
    await queryInterface.removeColumn('vehicles', 'height');
  },
};
