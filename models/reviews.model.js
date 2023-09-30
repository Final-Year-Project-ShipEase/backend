const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Review = sequelize.define('review', {
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

  Review.associate = (models) => {
    Review.belongsTo(models.Driver, { foreignKey: 'driver_id' });
  };
  return Review;
};
