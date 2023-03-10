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

router
    .route('/verify-email')
    .post(userController.verifyUser)

router
    .route('/forgot-password')
    .post(userController.forgotPasswordEmail)

router
    .route('/reset-password')
    .post(userController.resetPassword)



module.exports = router;