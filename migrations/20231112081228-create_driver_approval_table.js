module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('driverApprovals', {
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
      tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      permission: {
        type: Sequelize.ENUM('approved', 'rejected'),
      },
      status: {
        type: Sequelize.ENUM('active', 'closed'),
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

    await queryInterface.addConstraint('driverApprovals', {
      fields: ['driver_id'],
      type: 'foreign key',
      name: 'fk_approval_driver_id',
      references: {
        table: 'drivers',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('driverApprovals', {
      fields: ['tenant_id'],
      type: 'foreign key',
      name: 'fk_approval_tenant_id',
      references: {
        table: 'tenants',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('driverApprovals', {
      fields: ['admin_id'],
      type: 'foreign key',
      name: 'fk_approval_admin_id',
      references: {
        table: 'admins',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      'driverApprovals',
      'fk_approval_driver_id'
    );
    await queryInterface.removeConstraint(
      'driverApprovals',
      'fk_approval_tenant_id'
    );
    await queryInterface.removeConstraint(
      'driverApprovals',
      'fk_approval_admin_id'
    );
    await queryInterface.dropTable('driverApprovals');
  },
};
