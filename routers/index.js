const express = require("express");
const questionsRouter= require("./questionRouter");
const usersRouter = require("./userRouter");
const answersRouter = require("./answerRouter");
const commentsRouter = require("./commentRouter");
const voteRouter = require("./votesRouter")
const router = express.Router();

router.use("/users",usersRouter);
router.use("/questions",questionsRouter);
router.use("/answers",answersRouter);
router.use("/comments",commentsRouter);
router.use("/votes",voteRouter)

router.all('*', (req, res, next) => {
    res.status(400).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server`
    })
   
});



module.exports = router;