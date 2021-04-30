//################################## Working with Mongo DB with Mongoose ###############################################################
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    title : {
        type : String,
        require : true
    },
    imageURL : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    description : String,
    userID : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('Product',product);
// //################################## Working with Mongo DB ###############################################################
// const getDB = require('../DB/mongoDB').getDB
// const MongoObjectID = require('../DB/mongoDB').MongoObjectID

// class Product{
//   constructor(title,imageURL,price,description,_id,UserId){
//     this.title = title;
//     this.imageURL = imageURL;
//     this.price = price;
//     this.description = description;
//     this._id = _id;
//     this.UserId = UserId;
//   }

//   save(){
//     let dbDoc;
//     const db = getDB();
//     if(this._id){
//       this._id = MongoObjectID(this._id);
//       dbDoc = db.collection('products') 
//                 .updateOne({_id : this._id},{$set : this});
//     }else{
//       dbDoc = db.collection('products')
//                 .insertOne(this);
//     }
//     return dbDoc.then(result => result)
//                 .catch(err => console.log(err));
//   }

//   static findAll(){
//     const db = getDB();
//     return db.collection('products')
//              .find()
//              .toArray()
//              .then(products => {
//                console.log('products fetched !')
//                return products;
//              })
//              .catch(err => console.log(err));
//   }

//   static findById(id){
//     const db = getDB();
//     return db.collection('products')
//              .find({_id : MongoObjectID(id)})
//              .next()
//              .then(product => {
//                console.log('Product found!');
//                return product;
//              })
//              .catch(err => console.log(err));
//   }

//   static deleteProductById(id){
//     const db = getDB();
//     return db.collection('products')
//               .deleteOne({_id : MongoObjectID(id)})
//               .then(result => result)
//               .catch(err => console.log(err));
//   }
// }

// module.exports = Product;
//################################## Working with DB using sequelize(uses mysql2 internally) ##################
// const sequelize = require("sequelize");
// const DB = require("../DB/sqlDB");

// const Product = DB.define(
//                 "product",
//                 {
//                   id: {
//                     type: sequelize.INTEGER,
//                     autoIncrement: true,
//                     primaryKey: true,
//                     allowNull: false
//                   },
//                   title: sequelize.STRING,
//                   price: {
//                     type: sequelize.DOUBLE,
//                     allowNull: false
//                   },
//                   description: {
//                     type: sequelize.STRING,
//                     allowNull: false
//                   },
//                   imageURL: {
//                     type: sequelize.STRING,
//                     allowNull: false
//                   }
//                 }
//               );
// module.exports = Product;

//################################## Working with DB using just mysql2 ########################################
// const query = require('../DB/sqlDB');

// module.exports = class Product {
//   constructor(title, imageUrl, description, price) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return query.execute("INSERT INTO products (title, price, description, imageUrl) VALUES(?, ?, ?, ?)",
//                     [this.title,this.price,this.description,this.imageUrl] );
//   }

//   static fetchAll(){
//     return query.execute("SELECT * FROM products");
//   }

//   static fetchProductById(id){
//    return query.execute("SELECT * FROM products WHERE products.id=?",[id]);
//   }

//   static editProductById(id, editedValues){
//     return query.execute("UPDATE products SET title=?, price=?, description=?, imageUrl=? WHERE id=?",
//                         [editedValues.title, editedValues.price, editedValues.description, editedValues.imageUrl, id]);
//   }

//   static deleteProductById(id){
//     return query.execute("DELETE FROM products where id=?",[id]);
//   };
// }

//####################################################### FIle system Logic ############################################
// const fs = require('fs');
// const path = require('path');
// const query = require('../DB/sqlDB');

// const p = path.join(
//   path.dirname(require.main.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(title, imageUrl, description, price) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     // getProductsFromFile(products => {
//     //   this.id = products.length;
//     //   products.push(this);
//     //   fs.writeFile(p, JSON.stringify(products), err => {
//     //     console.log(err);
//     //   });
//     // });
//   }

//   static fetchAll(){
//     return query.execute("SELECT * FROM products");                                         Edited by mistake
//   }

//   static fetchProductById(id){
//    return query.execute("SELECT * FROM products WHERE products.id=?",[id]);                  Edited by mistake
//   }

//   static editProductById(id, callBack, rendererCallBack){
//     getProductsFromFile((products) => {
//       products.forEach((product,index,productList)=>{
//         if(product.id === +id){
//           // console.log(product, index, productList[index]);
//           productList[index]=callBack(product);
//           fs.writeFile(p, JSON.stringify(productList),(err)=>{});
//           rendererCallBack();
//         }
//       });
//     });
//   }

//   static deleteProductById(id, callback){
//     getProductsFromFile((products)=>{
//       const remainingProduct = products.filter((product)=>product.id!==+id);
//       fs.writeFile(p, JSON.stringify(remainingProduct), (err)=>{});
//       callback();
//     });
//   }
// };

//################################################# MY LOGIC #######################################################
// const fs = require('fs');
// const path = require('path');

// module.exports = class Product{
//     constructor(title){
//         this.title = title;
//     }
//     save(){
//         let product = [];
//         let filePath = path.join(path.dirname(require.main.filename),"Data","products.json");
//         fs.readFile(filePath,(err, fileContent)=>{
//             if(!err){
//                 product = fileContent.length ? JSON.parse(fileContent) : [];
//             }
//             product.push(this);
//             fs.writeFile(filePath,JSON.stringify(product),(err)=>{
//                 console.log(err, "error");
//             });
//         });
//     }
//     static fatchAll(callback){
//         let filePath = path.join(path.dirname(require.main.filename),"Data","products.json");
//         // let filePath = path.join(__dirname,'../','Data','products.json');        Alternate
//         fs.readFile(filePath,(err,fileContent)=>{
//             if(!err)
//                 callback(JSON.parse(fileContent));
//             else    
//                 callback([]);
//         });
//     }
// }
 