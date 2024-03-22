module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('poolRequests', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      types: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      destination: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
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

    // Define foreign key for the many-to-one relationship with booking_id
    await queryInterface.addConstraint('poolRequests', {
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
  },

  down: async (queryInterface) => {
    // Remove foreign key first
    await queryInterface.removeConstraint('poolRequests', 'fk_booking_id');

    // Drop the poolRequests table
    await queryInterface.dropTable('poolRequests');
  },
};
