const questionsController = require('../controllers/questionsController');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware')
router.use(middleware.auth)

router
    .route('/ask')
    .post(questionsController.createQuestion)

router
    .route('/all_questions')
    .get(questionsController.getAllQuestions)
    
router
    .route('/:id')
    .get(questionsController.getQuestionById)

router
    .route('/user/:id')
    .get(questionsController.getQuestionByUserId)

router
    .route('/askAI')
    .post(questionsController.askAI)



module.exports = router;