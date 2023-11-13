module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('driverApproval', {
      driver_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNUll: false,
        unique: true,
      },
      tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      admin_id: {
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

    await queryInterface.addConstraint('driverApproval', {
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

    await queryInterface.addConstraint('driverApproval', {
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

    await queryInterface.addConstraint('driverApproval', {
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

    await queryInterface.addConstraint('driverApproval', {
      fields: ['admin_id'],
      type: 'foreign key',
      name: 'fk_admin_id',
      references: {
        table: 'admins',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('driverApproval', 'fk_driver_id')
    await queryInterface.removeConstraint('driverApproval', 'fk_tenant_id')
    await queryInterface.removeConstraint('driverApproval', 'fk_user_id')
    await queryInterface.removeConstraint('driverApproval', 'fk_admin_id')
    await queryInterface.dropTable('driverApproval');
  }
};
