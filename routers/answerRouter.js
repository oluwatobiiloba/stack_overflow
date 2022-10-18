const answersController = require('../controllers/answersController');
const express = require('express');
const router = express.Router();

router
    .post('/answer',answersController.createAnswer)

router
    .get('/',answersController.getAllAnswers)



module.exports = router;