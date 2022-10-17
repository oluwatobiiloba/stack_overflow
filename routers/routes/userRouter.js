const { userController } = require('../../controllers')
const express = require('express');
const router = express.Router();


router
    .post('/signup',userController.signUp)



module.exports = router;