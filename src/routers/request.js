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


        // 1. Only ignore/interest can come 
        const allowedStatus = [ "interested", "ignored"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid status:" + status);
        }


        //2.if there is a existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                { fromUserId, toUserId},
                { fromUserId: toUserId, toUserId: fromUserId},
            ],
        });
        if(existingConnectionRequest){
            throw new Error("Connection already Exists");
        };


        //3.the connection user enters is exist in our database or not 
        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error("User doesnot exists");
        }


        const connectionRequest = new ConnectionRequest ({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.status(200).json({
            message: "Connection Requset Sent Successfully",
            data,
        });



    }catch(err){
        res.status(400).send("ERROR" + err.message);
    }
    
});

module.exports = requestRouter;