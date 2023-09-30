module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pool_Requests', {
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
    await queryInterface.addConstraint('Pool_Requests', {
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
  },

  down: async (queryInterface) => {
    // Remove foreign key first
    await queryInterface.removeConstraint('Pool_Requests', 'fk_booking_id');

    // Drop the Pool_Requests table
    await queryInterface.dropTable('Pool_Requests');
  },
};
