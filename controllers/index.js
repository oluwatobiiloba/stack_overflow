
const userController = require("./userControllers");
const questionsController = require('./questionsController');
const answerController = require('./answersController');
const voteController = require('./voteControllerr');
const commentController = require('./commentsController');
const error = require('./error');

module.exports = {
    error,
    userController,
    questionsController,
    voteController,
    answerController,
    commentController,

};