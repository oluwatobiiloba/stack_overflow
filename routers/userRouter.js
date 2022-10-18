const userController = require('../controllers/userControllers');
const express = require('express');
const router = express.Router();

router
    .post('/signup',userController.signUp)

router 
    .get('/', userController.getAllUsers)



module.exports = router;