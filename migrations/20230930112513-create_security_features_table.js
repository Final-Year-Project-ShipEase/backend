module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('securityFeatures', {
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
    await queryInterface.addConstraint('securityFeatures', {
      fields: ['booking_id'],
      type: 'foreign key',
      name: 'fk_booking_id_security_features',
      references: {
        table: 'bookings',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('securityFeatures', {
      fields: ['driver_id'],
      type: 'foreign key',
      name: 'fk_driver_id_security_features',
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
    await queryInterface.removeConstraint(
      'securityFeatures',
      'fk_booking_id_security_features'
    );
    await queryInterface.removeConstraint(
      'securityFeatures',
      'fk_driver_id_security_features'
    );

    // Drop the securityFeatures table
    await queryInterface.dropTable('securityFeatures');
  },
};
