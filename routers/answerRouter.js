const answersController = require('../controllers/answersController');
const express = require('express');
const userControllers = require('../controllers/userControllers')
const router = express.Router();
const middleware = require('../middleware')
router.use(middleware.auth)

router
    .post('/answer', answersController.createAnswer)

router
    .get('/all_answers', answersController.getAllAnswers)

router
    .get('/:user_id/:question_id', answersController.getAnswerByUserIdandQuestionId)
    
    
router
    .get('/:id', answersController.getAnswerById)
    
router
    .put('/vote', answersController.vote)
    


module.exports = router;