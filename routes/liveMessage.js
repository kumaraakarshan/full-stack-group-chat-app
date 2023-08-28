const express = require('express');

const liveMessageController = require('../controller/liveMessage');
const auth = require('../middleware/auth');


const router = express.Router();


//router.get('/chat',auth.auth,liveMessageController.initializeSocketIO);




module.exports = router;