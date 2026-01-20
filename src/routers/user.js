const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middleWare/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        })

        res.status(200).json({
            message: "Connection requests retrieved successfully",
            data: connectionRequest,
        });

    }
    catch(err){
        res.status(400).send("ERROR" + err.message);
    }
});