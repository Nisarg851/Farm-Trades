//############################# Mongo DB Configurations ##########################
const Product = require('../models/product');
const person = ["Nisarg Mahyavanshi","Bhavya Desai","Abhishek Gohil","Tejus Patel"];
const personDetail = require('../data/person.json');

exports.getProfile = (req,res,next) => {
  return res.render('FarmerProfile.ejs',personDetail["Nisarg Mahyavanshi"]);
}

exports.Index = (req,res,next) => {
  return res.render('index.ejs');
}

exports.IndexContact = (req,res,next) => {
  return redirect('/index#footer');
}

exports.getProducts = (req, res, next) => {
  Product.find()
          .then(products => {
              res.render('shop/product-list',{
                prods: products,
                pageTitle: 'All Products',
                path: '/products' 
              });
            })
          .catch( err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id)
          .then( product => {
              console.log("Product: ",product.title," \nPrice: ",product.price," \nDesc: ",product.description);
              res.render('shop/product-detail',{
                product: product, 
                pageTitle: product.title, 
                path: '/products'
              });
            })
          .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
          .then( products => { 
              res.render('shop/index',{
                prods: products,
                pageTitle: 'Shop',
                path: '/' 
              });
            })
          .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
          .then(cartProducts => {
            let totalPrice = 0;
            cartProducts.forEach(product => {
              totalPrice += (+product.productID.price)*(product.quantity);
            });
            res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        cartProducts: cartProducts,
                        totalPrice: totalPrice }); 
            })
          .catch(err => console.log(err));
};

exports.addToCart = (req,res,next) => {
  const productId = req.body.id;
  const user = req.user;
  // console.log(user);
  Product.findById(productId)
         .then(product => {
            return user.addToCart(product)
         })
         .then(result => {
                         console.log("Product added into the Cart");
                         res.redirect("/cart");
         })
         .catch(err => console.log(err));
};

exports.deleteCartItem = (req,res,next) => {
  const id = req.params.id;
  req.user.deleteCartItem(id)
          .then(result => {
            console.log('Product Added to Cart');
            res.redirect('/cart'); 
          })
          .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
          .then(orders => { 
            res.render("shop/orders",{
              pageTitle : "Orders",
              path : '/orders',
              orders : orders
            });
          })
          .catch(err => console.log(err));
};

exports.postOrders = (req, res, next) => {
  req.user.order()
          .then(result => {
            console.log("Order processed Successfully!"); 
            res.redirect("/orders");
          })
          .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
