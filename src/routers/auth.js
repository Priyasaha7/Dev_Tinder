const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

// Registering a new user, this is a entry point for our user to signup
authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of Data
    validateSignUpData(req);

    const { firstName, lastName, emailID, password } = new User(req.body);

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    await user.save();
    res.send("User adeed successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create a JWT token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Login failed: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Successful");
});

module.exports = authRouter;
