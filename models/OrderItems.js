// **** NOT NEED FOR THIS MODEL IN MONGO DB ****

// Maintains which order belong to which user and it may contain many products;
//i.e Intermediate Table between ORDER and PRODUCT
const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");
const DB = require("../DB/sqlDB");

const OrderItem = DB.define(
    "OrderItems",{
        id:{
            type: INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantity: Sequelize.INTEGER
    }
);

module.exports = OrderItem;