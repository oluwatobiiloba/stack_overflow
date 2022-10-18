const express = require("express");
const questionsRouter= require("./questionRouter");
const usersRouter = require("./userRouter");
const router = express.Router();

router.use("/users",usersRouter);
router.use("/questions",questionsRouter)



module.exports = router;