const express = require('express');

const loginController = require('../controller/login');


const router = express.Router();

router.get('/login', loginController.loginPage);
router.post('/login', loginController.postLogin);



module.exports = router;