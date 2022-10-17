const express = require("express");
const usersRouter= require("./routes/userRouter")
const router = express.Router();

router.use("/users",usersRouter);



module.exports = router;