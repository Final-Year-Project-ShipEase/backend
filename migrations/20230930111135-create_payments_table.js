module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // This enforces the one-to-one relationship
      },
      date: {
        type: Sequelize.DATE,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      received: {
        type: Sequelize.INTEGER,
      },
      remaining: {
        type: Sequelize.INTEGER,
      },
      source: {
        type: Sequelize.JSON,
      },
      account_no: {
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

    // Define foreign keys for the one-to-one relationship with booking_id
    await queryInterface.addConstraint('Payments', {
      fields: ['booking_id'],
      type: 'foreign key',
      name: 'fk_booking_id',
      references: {
        table: 'Bookings',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Define foreign key for the many-to-one relationship with tenant_id
    await queryInterface.addConstraint('Payments', {
      fields: ['tenant_id'],
      type: 'foreign key',
      name: 'fk_tenant_id',
      references: {
        table: 'Tenants',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    // Remove foreign keys first
    await queryInterface.removeConstraint('Payments', 'fk_booking_id');
    await queryInterface.removeConstraint('Payments', 'fk_tenant_id');

    // Drop the Payments table
    await queryInterface.dropTable('Payments');
  },
};
