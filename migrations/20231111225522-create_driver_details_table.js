module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('driverDetails', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
      },
      cnic: {
        type: Sequelize.STRING,
      },
      liscence: {
        type: Sequelize.BLOB,
      },
      trackerNo: {
        type: Sequelize.STRING,
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

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('driverDetails', 'fk_driver_id');
    await queryInterface.dropTable('driverDetails');
  },
};
