const express = require("express");
const questionsRouter= require("./questionRouter");
const usersRouter = require("./userRouter");
const answersRouter = require("./answerRouter");
const router = express.Router();

router.use("/users",usersRouter);
router.use("/questions",questionsRouter);
router.use("/answers",answersRouter);



module.exports = router;