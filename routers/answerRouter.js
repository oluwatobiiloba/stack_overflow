const answersController = require('../controllers/answersController');
const express = require('express');
const router = express.Router();

router
    .route('/answer')
    .post(answersController.createAnswer)

router
    .route('/')
    .get(answersController.getAllAnswers)
    
router
    .route('/:id')
    .get(answersController.getAnswerById)

router
    .route('/vote')
    .put(answersController.vote)



module.exports = router;