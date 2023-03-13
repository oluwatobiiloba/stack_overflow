const userController = require('../controllers/userControllers');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
const worker_pool = require('../worker-pool/init')

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
    .post('/upload-image', middleware.auth, middleware.uploadStrategy, async (req, res) => {
        const uploadData = {
            file: req.file,
            body: req.body,
            user: {
                id: req.user.id,
                username: req.user.username,
            }

        }
        const pool = await worker_pool.get_proxy();
        pool.upload_image({ uploadData })
        res.status(202).json({ message: 'File upload request queued for processing' });
    })


module.exports = router;