const express = require('express');

const liveMessageController = require('../controller/liveMessage');
const auth = require('../middleware/auth');


const router = express.Router();


//router.get('/live',auth.auth,liveMessageController.getLiveGroup);




module.exports = router;