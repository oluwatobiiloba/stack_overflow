const userController = require('../controllers/userControllers');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware')


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

router
    .post('/upload-image', middleware.auth, middleware.uploadStrategy, userController.upload_image)


module.exports = router;