module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicleApprovals', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
        unique: true,
      },
      tenant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
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

    await queryInterface.addConstraint('vehicleApprovals', {
      fields: ['vehicle_id'],
      type: 'foreign key',
      name: 'fk_vehicle_id',
      references: {
        table: 'vehicles',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('vehicleApprovals', {
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

    await queryInterface.addConstraint('vehicleApprovals', {
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

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('vehicleApprovals', 'fk_driver_id');
    await queryInterface.removeConstraint('vehicleApprovals', 'fk_tenant_id');
    await queryInterface.removeConstraint('vehicleApprovals', 'fk_admin_id');
    await queryInterface.dropTable('vehicleApprovals');
  },
};
