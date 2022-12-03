const answersController = require('../controllers/answersController');
const express = require('express');
const userControllers = require('../controllers/userControllers')
const router = express.Router();

router
    .route('/answer')
    .post(answersController.createAnswer)

router
    .route('/all_answers')
    .get(answersController.getAllAnswers)
    
router
    .route('/:id')
    .get(answersController.getAnswerById)

router
    .use(userControllers.protect)
    .route('/vote')
    .put(answersController.vote)



module.exports = router;