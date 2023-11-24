module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicleDetails', {
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      trackerNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownerCnic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vehicleReg: {
        type: Sequelize.BLOB,
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
    await queryInterface.addConstraint('vehicleDetails', {
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
  },

  down: async (queryInterface) => {
    // Remove foreign keys first
    await queryInterface.removeConstraint('vehicleDetails', 'fk_vehicle_id');

    // Drop the documentDetails table
    await queryInterface.dropTable('vehicleDetails');
  },
};
