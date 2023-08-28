const express = require('express');

const createGroupController = require('../controller/createGroup');
const auth = require('../middleware/auth');


const router = express.Router();

router.get('/group/create', createGroupController.getCreateGropPage);
router.post('/group/create', auth.auth, createGroupController.createGroup);



module.exports = router;