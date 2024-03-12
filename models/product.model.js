// models/product.js 
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => { 
    const Product = sequelize.define('product', { 
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false, 
        }, 
        name: { 
            type: DataTypes.STRING, 
            allowNull: false, 
        }, 
        image: { 
            type: DataTypes.STRING, 
            allowNull: true, 
        }, 
        price: { 
            type: DataTypes.FLOAT, 
            allowNull: false, 
        }, 
        description: { 
            type: DataTypes.TEXT, 
        },
     });

return Product; };