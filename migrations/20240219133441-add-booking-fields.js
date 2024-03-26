//  add width and height to the bookings table

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('bookings', 'width', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('bookings', 'height', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('bookings', 'width');
    await queryInterface.removeColumn('bookings', 'height');
  },
};
