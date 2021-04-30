//####################################### Mongo DB Logic module ############################################
const Product = require('../models/product');
const person = require('../data/person.json');
const personName = ["Nisarg Mahyavanshi","Bhavya Desai","Abhishek Gohil","Tejus Patel"];

exports.getLoginPage = (req, res, next) => {
  return res.render('Login.ejs',{display:"none"});
}

exports.getRegistrationPage = (req, res, next) => {
  return res.render('Registration.ejs');
}

exports.search = (req,res,next) => {
  const name = req.body.search;
  let isFriend = person[name].name ? 2 : 0;
  if(req.body.known)
    isFriend=2;
  if(person[name])
    return res.render('requestProfile.ejs',{...person[name], requested : isFriend});
  else
    return res.render('404.ejs',{pageTitle : "Error", path : ""});
}

exports.request = (req, res, next) => {
  const requestTo = req.params.name;
  return res.render('requestProfile.ejs',{...person[requestTo], requested : 1});
}

exports.userProfile = (req, res, next) => {
  // console.log("In userProfile");
  if(person[req.body.name])
    res.render('FarmerProfile.ejs',person[req.body.name]);
  else
    return res.render('Login.ejs',{display:"block"});
}

exports.getChatList = (req, res, next) => {
  res.render('ChatList.ejs');
}

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    edit: null
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL ? req.body.imageURL : req.body.imageFile;
  const price = req.body.price;
  const description = req.body.description;
  const userID = req.user._id;
  const newProduct = new Product({
    title : title,
    imageURL : imageURL,
    price : price,
    description : description,
    userID : userID
  });
  newProduct.save()
            .then(result => {
              console.log('Product Created');
              res.redirect('/admin/products');
            })
            .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
         .then( products => { res.render('admin/products',{
                                prods: products,
                                pageTitle: "Admin Products",
                                path: '/admin/products'
                              });                      
                            })
          .catch(err => console.log(err));
};

exports.editProductForm = (req, res, next) => {
  const edit = req.query.edit;
  Product.findById(req.params.id)
          .then( product => { res.render('admin/edit-product',{
                          pageTitle: 'Edit Product',
                          path: '/admin/edit-product',
                          edit: edit==='true',
                          product: product
                        });                      
          })
          .catch(err => console.log(err));
};

exports.editProduct = (req, res ,next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  Product.findByIdAndUpdate(req.params.id)
          .then( product => {
            product.title = title;
            product.imageURL = imageURL;
            product.price = price;
            product.description = description;
            return product.save();
          })
          .then(result => {
            console.log("Product updated");
            res.redirect("/admin/products");
          })
          .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndRemove(req.params.id)
          .then( result => {
            console.log("Product Destroyed");
            res.redirect("/admin/products");
          })
          .catch( err => console.log(err));
}  