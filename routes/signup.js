const express = require('express');

const signupController = require('../controller/signup');


const router = express.Router();

router.get('/signup', signupController.signupPage);
router.post('/signup', signupController.postSignup);



module.exports = router;