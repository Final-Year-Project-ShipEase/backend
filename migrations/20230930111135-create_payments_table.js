module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
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
    await queryInterface.addConstraint('payments', {
      fields: ['booking_id'],
      type: 'foreign key',
      name: 'fk_booking_id',
      references: {
        table: 'bookings',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Define foreign key for the many-to-one relationship with tenant_id
    await queryInterface.addConstraint('payments', {
      fields: ['tenant_id'],
      type: 'foreign key',
      name: 'fk_tenant_id',
      references: {
        table: 'tenants',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    // Remove foreign keys first
    await queryInterface.removeConstraint('payments', 'fk_booking_id');
    await queryInterface.removeConstraint('payments', 'fk_tenant_id');

    // Drop the payments table
    await queryInterface.dropTable('payments');
  },
};
