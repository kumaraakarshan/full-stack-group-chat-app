const express = require('express');


const uploadController = require('../controller/upload');
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/chat/upload', auth.auth, uploadController.upload.single('file'), uploadController.uploadS3);


module.exports = router;
