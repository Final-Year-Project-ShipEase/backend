module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicleApproval', {
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
      premission: {
        type: Sequelize.ENUM('approved', 'rejected'),
      },
      status: {
        type: Sequelize.ENUM('active', 'closed'),
      },
    });

    await queryInterface.addConstraint('vehicleApproval', {
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
    await queryInterface.removeConstraint('vehicleApproval', 'fk_driver_id');
    await queryInterface.removeConstraint('vehicleApproval', 'fk_tenant_id');
    await queryInterface.removeConstraint('vehicleApproval', 'fk_admin_id');
    await queryInterface.dropTable('vehicleApproval');
  },
};
