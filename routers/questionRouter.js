const questionsController = require('../controllers/questionsController');
const express = require('express');
const router = express.Router();

router
    .post('/ask',questionsController.createQuestion)

router
    .get('/',questionsController.getAllQuestions)



module.exports = router;