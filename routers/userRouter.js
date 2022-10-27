const userController = require('../controllers/userControllers');
const express = require('express');
const router = express.Router();

router
    .route('/signup')
    .post(userController.signUp)

router
    .route('/')
    .get(userController.getAllUsers)

router
    .route('/signin')
    .post(userController.signIn)



module.exports = router;