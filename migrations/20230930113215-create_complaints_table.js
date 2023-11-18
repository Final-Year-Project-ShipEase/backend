module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('complaints', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'resolved'),
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

    await queryInterface.addConstraint('complaints', {
      fields: ['admin_id'],
      type: 'foreign key',
      name: 'fk_admin_id',
      references: {
        table: 'admins',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('complaints', 'fk_admin_id');
    // Drop the complaints table
    await queryInterface.dropTable('complaints');
  },
};
