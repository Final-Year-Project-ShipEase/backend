module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('documentDetails', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // This enforces the one-to-one relationship
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // This enforces the one-to-one relationship
      },
      cnic: {
        type: Sequelize.STRING,
      },
      license: {
        type: Sequelize.BLOB,
      },
      inspection: {
        type: Sequelize.BLOB,
      },
      vehicleReg: {
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

    // Define foreign keys for the one-to-one relationships
    await queryInterface.addConstraint('documentDetails', {
      fields: ['vehicle_id'],
      type: 'foreign key',
      name: 'fk_vehicle_id',
      references: {
        table: 'vehicles',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('documentDetails', {
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
    // Remove foreign keys first
    await queryInterface.removeConstraint('documentDetails', 'fk_vehicle_id');
    await queryInterface.removeConstraint('documentDetails', 'fk_driver_id');

    // Drop the documentDetails table
    await queryInterface.dropTable('documentDetails');
  },
};
