const answersController = require('../controllers/answersController');
const express = require('express');
const userControllers = require('../controllers/userControllers')
const router = express.Router();
const middleware = require('../middleware')

router
    .route('/answer')
    .post(answersController.createAnswer)

router
    .route('/all_answers')
    .get(answersController.getAllAnswers)

router
    .use(middleware.auth)
    .route('/getAnswerByUseridandQuestionId')
    .get(answersController.getAnswerByUserIdandQuestionId)
    
    
router
    .route('/:id')
    .get(answersController.getAnswerById)
    
router
    .use(middleware.auth)
    .route('/vote')
    .put(answersController.vote)
    


module.exports = router;