const UserController = require("../controllers/userController.js");

const express = require("express");
const router = express.Router();
router.post("/signup", UserController.RegisterUser);
router.post('/login', UserController.userLogin)
module.exports = router;