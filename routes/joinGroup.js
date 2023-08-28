const express = require('express');

const joinGroupController = require('../controller/joinGroup');
const auth = require('../middleware/auth');


const router = express.Router();

router.get('/join/:id', joinGroupController.getJoinGropPage);
router.post('/join', auth.auth, joinGroupController.getGroupName);

router.get('/join', auth.auth, joinGroupController.joinGroup);



module.exports = router;