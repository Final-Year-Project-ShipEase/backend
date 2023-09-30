const { JSONB } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicles', {
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
      driver_id: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      regNo: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('Available', 'Intransit'),
      },
      location: {
        type: JSONB,
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

    // Define foreign keys for one-to-many and one-to-one relationships
    await queryInterface.addConstraint('vehicles', {
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

    await queryInterface.addConstraint('vehicles', {
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
    // Remove foreign keys first
    await queryInterface.removeConstraint('vehicles', 'fk_tenant_id');
    await queryInterface.removeConstraint('vehicles', 'fk_driver_id');

    // Drop the vehicles table
    await queryInterface.dropTable('vehicles');
  },
};
