module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('driverLicenseImages', {
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
