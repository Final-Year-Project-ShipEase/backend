module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('driverDetails', {
      driver_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNUll: false,
      },
      city: {
        type: Sequelize.STRING
      },
      cnic: {
        type: Sequelize.STRING
      },
      liscence: {
        type: Sequelize.BLOB
      },
      inspection: {
        type: Sequelize.BLOB
      }
    });

    await queryInterface.addConstraint('driverDetails', {
      fields: ['driver_id'],
      type: 'foreign key',
      name: 'fk_driver_id',
      references: {
        table: 'drivers',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('driverDetails', 'fk_driver_id')
    await queryInterface.dropTable('driverDetails');
  }
};
