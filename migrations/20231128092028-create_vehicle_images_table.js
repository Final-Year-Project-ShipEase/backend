module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicleImages', {
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
      },
      vehicleReg: {
        type: Sequelize.BLOB,
      },
      inspection: {
        type: Sequelize.BLOB,
      },
      vehiclePictures: {
        type: Sequelize.JSON,
      },
    });

    await queryInterface.addConstraint('vehicleImages', {
      fields: ['vehicle_id'],
      type: 'foreign key',
      name: 'fk_vehicle_images_id',
      references: {
        table: 'vehicles',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      'vehicleImages',
      'fk_vehicle_images_id'
    );
    await queryInterface.dropTable('vehicleImages');
  },
};
