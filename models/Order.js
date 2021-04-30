// ######### Order Model for MongoDB with Mongoose ###########################
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    products : [],
    user : {
        userID : {
            type : Schema.Types.ObjectId,
            require : true,
            ref : 'User'
        }, 
        name : {
            type : String,
            require : true
        }
    }
});

module.exports = mongoose.model('Order',Order);

// // **** NOT NEED FOR THIS MODEL IN PLAIN MONGO DB ****

// const Sequelize = require("sequelize");
// const DB = require("../DB/sqlDB")

// const Order = DB.define(
//     "Order",
//     {
//         id:{
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         }
//     }
// )

// module.exports = Order;