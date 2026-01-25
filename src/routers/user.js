const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleWare/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_PROFILE_FIELDS =
  "firstName lastName about age gender skills photoUrl";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_PROFILE_FIELDS);

    res.status(200).json({
      message: "Connection requests retrieved successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      //.populate("fromUserId toUserId", USER_PROFILE_FIELDS);
      .populate("fromUserId", USER_PROFILE_FIELDS)
      .populate("toUserId", USER_PROFILE_FIELDS);

    const data = connectionRequest.map((k) => {
      if (k.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return k.toUserId;
      }
      return k.fromUserId;
    });
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_PROFILE_FIELDS)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

module.exports = userRouter;
