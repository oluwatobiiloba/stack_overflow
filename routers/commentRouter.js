const commentsController = require('../controllers/commentsController');
const express = require('express');
const router = express.Router();

router
    .post('/comment',commentsController.createComment)

router
    .get('/',commentsController.getAllComments)





module.exports = router;