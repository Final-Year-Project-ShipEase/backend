module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('driverLicenseImages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
      },
      license: {
        type: Sequelize.BLOB,
      },
      profilePicture: {
        type: Sequelize.BLOB,
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

    await queryInterface.addConstraint('driverLicenseImages', {
      fields: ['driver_id'],
      type: 'foreign key',
      name: 'fk_driver_license_id',
      references: {
        table: 'drivers',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      'driverLicenseImages',
      'fk_driver_license_id'
    );
    await queryInterface.dropTable('driverLicenseImages');
  },
};
