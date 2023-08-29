const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPass');

router.use('/forgotpassword', forgotPasswordController.forgotPassword);

router.get('/reset/:id', forgotPasswordController.resetPassword);

router.get('/update/:id',forgotPasswordController.updatePassword)


module.exports = router;