const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    star: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.TIMESTAMP,
    },
  });

  // Define many-to-one association to the "Drivers" model
  Review.belongsTo(Driver, { foreignKey: 'driver_id' });

  return Review;
};
