module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicleApproval', {
      driver_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNUll: false,
      },
      tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('approved', 'rejected'),
      },
      status: {
        type: Sequelize.ENUM('active', 'closed'),
      },
    });

    await queryInterface.addConstraint('vehicleApproval', {
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

    await queryInterface.addConstraint('vehicleApproval', {
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

    await queryInterface.addConstraint('vehicleApproval', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_id',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('vehicleApproval', 'fk_driver_id')
    await queryInterface.removeConstraint('vehicleApproval', 'fk_tenant_id')
    await queryInterface.removeConstraint('vehicleApproval', 'fk_user_id')
    await queryInterface.dropTable('vehicleApproval');
  }
};
