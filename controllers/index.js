const userController = require("./userControllers");
const questionsController = require('./questionsController');
const answerController = require('./answerController');
const voteController = require('./voteController');
const commentController = require('./commentController');


module.exports = {
    userController,
    questionsController,
    voteController,
    answerController,
    commentController
};