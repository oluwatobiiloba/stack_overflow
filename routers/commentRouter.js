const commentsController = require('../controllers/commentsController');
const express = require('express');
const router = express.Router();

router
    .route('/comment')
    .post(commentsController.createComment)

router
    .route('/all_comments')
    .get(commentsController.getAllComments)

router
    .route('/user/:id')
    .get(commentsController.getCommentsByUserId)

router
    .route('/answer/:id')
    .get(commentsController.getCommentsByAnswerId)


module.exports = router;