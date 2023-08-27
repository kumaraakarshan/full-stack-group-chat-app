const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class UserController{
    static RegisterUser = async (req, res) => {
        const { name, email, password } = req.body;
    
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.json({
            status: 409,
            error: "User already exists.",
            // user: existingUser,
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          User.create({ name, email, password: hashPassword })
            .then((result) => {
              res
                .status(201)
                .json({ status: 201, message: "User registered successfully" });
            })
            .catch((error) => {
              res.status(500).json({ error: error });
            });
        }
      };

      static userLogin = async (req, res) => {
        try {
          const { email, password } = req.body;
          if (email && password) {
            const user = await User.findOne({ where: { email } });
            if (user != null) {
              const isMatch = await bcrypt.compare(password, user.password);
              console.log("Provided Email:", email);
              console.log("Retrieved User:", user);
              if (user.email === email && isMatch) {
                console.log("Email and Password Match");
                const token = jwt.sign({ userID: user.id }, "jwt-secret-token", {
                  
                  expiresIn: "5d",
                  
                });
                //console.log('*********'+token);
                res.send({
                  status: 200,
                  message: "Login Success",
                  token: token,
                  user: user,
                });
              } else {
                res.send({
                  status: 500,
                  message: "Email or Password is not Valid",
                });
              }
            } else {
              res.send({
                status: 500,
                message: "You are not a Registered User",
              });
            }
          } else {
            res.send({ status: "500", message: "All Fields are Required" });
          }
        } catch (error) {
          console.log(error);
          res.send({ status: "500", message: "Unable to Login" });
        }
      };
}

module.exports = UserController;