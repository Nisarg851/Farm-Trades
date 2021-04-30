// **** NOT NEED FOR THIS MODEL IN MONGO DB ****

//i.e Intermediate Table between ORDER and PRODUCT
const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");
const DB = require("../DB/sqlDB");

const CartItem = DB.define(
    "Cart Products",
    {
        id:{
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: Sequelize.INTEGER
    }
);

module.exports = CartItem;
// ############################################## Working with File System ##############################################
// const fs = require('fs');
// const path = require('path');

// const filePath = path.join(
//     path.dirname(require.main.filename),
//     'data',
//     'Cart.json'
// );

// module.exports = class Cart{
//     static addProduct(product, callBack){
//         fs.readFile(filePath, (err, fileContent)=>{
//             let cartProducts = {products:[],totalPrice:0};
//             let itemfound = false;
//             if(!err && fileContent!=""){
//                 cartProducts = JSON.parse(fileContent);
//             }
//             cartProducts.products.forEach( item => {
//                 if(item.id === product.id){
//                     item.quantity+=1;
//                     cartProducts.totalPrice += +product.price;
//                     cartProducts.totalPrice = +cartProducts.totalPrice.toFixed(2);
//                     itemfound=true;
//                 }
//             });
//             if(!itemfound){
//                 cartProducts.products.push({id: product.id,price: product.price,quantity: 1});
//                 cartProducts.totalPrice += +product.price;
//                 cartProducts.totalPrice = +cartProducts.totalPrice.toFixed(2);
//             }
//             fs.writeFile(filePath,JSON.stringify(cartProducts),(err)=>{});
//             callBack();
//         });
//     }

//     static getCartProducts(products, callBack){
//         fs.readFile(filePath, (err, fileContent)=>{
//             let cart = {products:[], totalPrice:0};
//             if(!err && fileContent!=""){
//                 cart = JSON.parse(fileContent);
//             }
//             const cartProducts = cart.products.map((product)=>{
//                 let item = products.find((prod)=> prod.id==product.id);
//                 let itemQuantity = product.quantity;
//                 return {item,itemQuantity};
//             });
//             callBack(cartProducts, cart.totalPrice);
//         });
//     }

//     static deleteItemById(id, callBack){
//         fs.readFile(filePath, (err, fileContent)=>{
//             let cartItems = JSON.parse(fileContent);
//             cartItems.products.forEach((item, index, cart)=>{
//                 if(item.id == id){
//                     cart[index].quantity--;
//                     cartItems.totalPrice-= item.price;
//                     cartItems.totalPrice = +cartItems.totalPrice.toFixed(2);
//                     if(cartItems.totalPrice<0)
//                         cartItems.totalPrice=0;
//                 }
//             });
//             cartItems.products = cartItems.products.filter( item => item.quantity>0);
//             fs.writeFile(filePath, JSON.stringify(cartItems), (err)=>{});
//             callBack();
//         });
//     }
// }