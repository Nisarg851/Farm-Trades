const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/Login', adminController.getLoginPage); 

router.get('/Registration',adminController.getRegistrationPage);

router.get('/ChatList', adminController.getChatList);

router.post('/user', adminController.userProfile);

router.post('/search', adminController.search);

router.get('/request/:name', adminController.request);

// /admin/add-product => GET
router.get('/edit-product', adminController.getAddProduct);

// // /admin/products => GET
router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// // // /admin/edit-product => GET and POST
router.get('/edit-product/:id', adminController.editProductForm);
router.post('/edit-product/:id', adminController.editProduct);

router.post('/delete-product/:id', adminController.deleteProduct);

module.exports = router;
