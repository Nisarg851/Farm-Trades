const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// //authentication controllers;
// const authController = require('../controllers/auth');

// router.get('/login',authController.getLoginForm);

// router.post('/login',authController.postLoginForm);
// module.exports = router;


router.post('/newUser', authController.createNewUser);

module.exports = router;