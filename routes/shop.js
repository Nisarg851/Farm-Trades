const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/product/:id', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.addToCart);

router.get('/cartDeleteItem/:id', shopController.deleteCartItem);

router.get('/orders', shopController.getOrders);

router.post('/orders', shopController.postOrders);

router.get('/FarmerProfile', shopController.getProfile);

router.get('/index', shopController.Index);

router.get('/index#Contact', shopController.IndexContact);

module.exports = router;
