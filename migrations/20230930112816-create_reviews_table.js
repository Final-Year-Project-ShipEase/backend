module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
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
      star: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      review: {
        type: Sequelize.STRING,
      },
      date: {
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

    // Define foreign key for the many-to-one relationship with driver_id
    await queryInterface.addConstraint('reviews', {
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
    // Remove foreign key first
    await queryInterface.removeConstraint('reviews', 'fk_driver_id');

    // Drop the reviews table
    await queryInterface.dropTable('reviews');
  },
};
