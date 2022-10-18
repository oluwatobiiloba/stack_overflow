const express = require("express");
const questionsRouter= require("./questionRouter");
const usersRouter = require("./userRouter");
const answersRouter = require("./answerRouter");
const commentsRouter = require("./commentRouter");
const router = express.Router();

router.use("/users",usersRouter);
router.use("/questions",questionsRouter);
router.use("/answers",answersRouter);
router.use("/comments",commentsRouter)



module.exports = router;