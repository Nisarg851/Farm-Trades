// //######################## USER MODEL for Mongo DB with Mongoose #############################################
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = require('./Order');

const User = new Schema({
    userName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    cart : {
        items : [{
            productID : {
                type : Schema.Types.ObjectId,
                ref : 'Product',
                require : true
            },
            quantity : {
                type : Number,
                require : true
            }
        }]
    }
});

User.methods.getCart = function(){
    return this.populate('cart.items.productID')
        .execPopulate()
        .then(user => {
            return Promise.resolve(user.cart.items);
        })
}

User.methods.addToCart = function(product){
    let newQuantity = 1;
    let index = this.cart.items.findIndex( item => item.productID.toString()===product._id.toString())
    let updatedCart = {items:[{productID : product._id, quantity : newQuantity}]}
    if(index>=0){
        this.cart.items[index].quantity += 1;
    }else{
        this.cart.items.push(updatedCart.items[0]);
    }
    return this.save();
}

User.methods.deleteCartItem = function(productID){
    let updatedCart = this.cart.items.map(item => {
        if(item.productID==productID){
            --item.quantity;
        }
        return item;
    })
    updatedCart = updatedCart.filter(item => {
        return (0<item.quantity);
    });
    this.cart.items = updatedCart;
    return this.save();
}

User.methods.getOrders = function(){
    return Order.find().then(orders => orders);
}

User.methods.order = function(){
    return this.getCart()
                .then(prods => {
                    const products =  prods.map(item => {return {...item.productID._doc,quantity : item.quantity}});
                    const newOrder = new Order({
                        products : products,
                        user : {
                            userID : this._id,
                            name : this.userName
                        }
                    });
                    console.log('Saving Order...');
                    return newOrder.save();
                })
                .then(result => {
                    console.log("Orders Saved");
                    this.cart = {items:[]};
                    return this.save();
                })
                .catch(err => console.log(err));
    }   

module.exports = mongoose.model('User',User);
