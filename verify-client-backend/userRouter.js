require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, sequelize } = require("./db.js");
const jwt = require("jsonwebtoken");

// Registration
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.post("/create", async (req, res) => {
  const { name, password, email, iacID } = req.body;
  // Check if the User knows a secret key, serves as authorization ... Key should be changed often
  if (iacID === process.env.IAC_KEY) {
    // Create Password Hash
    const passHash = await bcrypt.hash(password, 10).catch((e) => {
      res.send({
        success: false,
        message: "Unable to Hash Password, Contact Web Admin",
      });
    });
    // Submit User to database
    const createdUser = await User.create({
      name: name.trim().toString(),
      email: email.trim().toLowerCase().toString(),
      password: passHash,
    }).catch((e) => {
        res.send({
          success: false,
          message: "Unable to Create User, Contact Web Admin",
          errorMessage: e
        });
      });
    if (createdUser) {
        res.send({
            success: true,
            message: "Created User Succesfully",
            user: createdUser.name,
          });
    } 
  } else {
    res.send({
      success: false,
      message: "IAC ID Incorrect !!!, Contact Web Admin for authorization",
    });
  }
});

// Authentication
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  if ((email, password)) {
    // Find User with email
    const foundUser = await User.findOne({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
    if (foundUser === null) {
      // If User Not found
      res.send({
        success: false,
        message:
          "User Not Found in Database, Please check credentials and try again",
      });
    } else {
      // Compare Passwords
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) {
        // Auth Failed
        res.send({ success: false, message: "Incorrect Login details" });
      } else {
        // Create Token
        const token = await jwt.sign(
          {
            name: foundUser.name,
            email: foundUser.email,
          },
          process.env.TOKEN_KEY
        );
        res.send({ success: true, message: "Logged In", token: token });
      }
    }
  } else {
    res.send({
      success: false,
      message: "Please Provide email and password ...",
    });
  }
});

module.exports = router;
