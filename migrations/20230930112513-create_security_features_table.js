module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Security_Features', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // This enforces the one-to-one relationship
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('QR', 'video'),
      },
      data: {
        type: Sequelize.JSON,
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

    // Define foreign keys for the one-to-one and many-to-one relationships
    await queryInterface.addConstraint('Security_Features', {
      fields: ['booking_id'],
      type: 'foreign key',
      name: 'fk_booking_id_security_features',
      references: {
        table: 'Bookings',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Security_Features', {
      fields: ['driver_id'],
      type: 'foreign key',
      name: 'fk_driver_id_security_features',
      references: {
        table: 'Drivers',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    // Remove foreign keys first
    await queryInterface.removeConstraint('Security_Features', 'fk_booking_id_security_features');
    await queryInterface.removeConstraint('Security_Features', 'fk_driver_id_security_features');

    // Drop the Security_Features table
    await queryInterface.dropTable('Security_Features');
  },
};
