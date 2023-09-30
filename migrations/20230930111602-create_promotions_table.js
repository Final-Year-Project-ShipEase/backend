module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('promotions', {
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
      couponNo: {
        type: Sequelize.STRING,
      },
      validationTill: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM('active', 'expired'),
      },
      phoneNo: {
        type: Sequelize.INTEGER,
      },
      city: {
        type: Sequelize.STRING,
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

    // Define foreign key for the many-to-one relationship with tenant_id
    await queryInterface.addConstraint('promotions', {
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
    await queryInterface.removeConstraint('promotions', 'fk_tenant_id');

    // Drop the promotions table
    await queryInterface.dropTable('promotions');
  },
};
