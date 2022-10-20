const voteController = require('../controllers/voteControllerr');
const express = require('express');
const router = express.Router();

router
    .get('/',voteController.getAllVotes)



module.exports = router;