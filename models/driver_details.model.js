const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const DriverDetail = sequelize.define('driverDetails', {
        driver_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNullValues: false,
            unique: true,
        },
        city: {
            type: DataTypes.STRING,
        },
        cnic: {
            type: DataTypes.STRING,
        },
        liscence: {
            type: DataTypes.BLOB
        },
        inspection: {
            type: DataTypes.BLOB
        },
        trackerNo: {
            type: DataTypes.STRING
        },
    });

    DriverDetail.associate = (models) => {
        DriverDetail.belongsTo(models.Driver, { foreignKey: 'driver_id' });
    };
    return DriverDetail;
};
