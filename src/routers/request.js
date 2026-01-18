const express = require("express");
const {userAuth} = require ("../middleWare/auth.js");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

    try{
        const user = req.user;

        const fromUserId = user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;


        // 1.Allow only valid request statuses (interested or ignored)
        const allowedStatus = [ "interested", "ignored"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid status:" + status);
        }


        //2.Check if a connection request already exists between the two users
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                { fromUserId, toUserId},
                { fromUserId: toUserId, toUserId: fromUserId},
            ],
        });
        if(existingConnectionRequest){
            throw new Error(" Connection already Exists");
        };


        //3.// Verify that the user receiving the connection request exists in the DB
        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error(" User doesnot exists");
        }


        const connectionRequest = new ConnectionRequest ({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.status(200).json({
            message: status === "interested"
                ? `${req.user.firstName} sent a connection request to ${toUser.firstName}`
                : `${req.user.firstName} ignored ${toUser.firstName}`,
            data,
        });



    }catch(err){
        res.status(400).send("ERROR" + err.message);
    }
    
});

module.exports = requestRouter;