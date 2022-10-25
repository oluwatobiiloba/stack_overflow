const questionsController = require('../controllers/questionsController');
const express = require('express');
const router = express.Router();


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









module.exports = router;