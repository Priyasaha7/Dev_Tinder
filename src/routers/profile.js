const express = require("express");
const { userAuth } = require("../middleWare/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditProfileData(req);

    const LoggedInUser = req.user; // the old user data from auth middleware
    if (!LoggedInUser) {
      throw new Error("User not found");
    }

    Object.keys(req.body).forEach((k) => {
      LoggedInUser[k] = req.body[k];
    }); // updating the user data with new data from req.body
    await LoggedInUser.save();

    res.send({
      message:
        LoggedInUser.firstName +
        " - Your profile has been updated successfully",
      data: LoggedInUser,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const LoggedInUser = req.user;
    if (!LoggedInUser) {
      throw new Error("User not found");
    }

    const { oldPassword, newPassword } = req.body;
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      LoggedInUser.password,
    );
    if (!isPasswordMatch) {
      throw new Error("Old password is incorrect");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // update password
    LoggedInUser.password = newPasswordHash;
    await LoggedInUser.save();

    res.send({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
