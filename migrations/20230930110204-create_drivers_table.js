module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('drivers', {
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
      name: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phoneNo: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
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

    // Define foreign key for the one-to-one relationship with tenant_id
    await queryInterface.addConstraint('drivers', {
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
    // Remove foreign key first
    await queryInterface.removeConstraint('drivers', 'fk_tenant_id');

    // Drop the drivers table
    await queryInterface.dropTable('drivers');
  },
};
