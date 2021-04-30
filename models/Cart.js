// **** NOT NEED FOR IT IN MONGO DB ****

// Maintains which cart belong to which user as for each user, a cart will be created
const Sequelize = require("sequelize");
const DB = require("../DB/sqlDB");

const Cart = DB.define(
    "Cart",
    {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    }   
);

module.exports = Cart;