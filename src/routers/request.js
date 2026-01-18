const express = require("express");
const {userAuth} = require ("../middleWare/auth.js");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {

    const user = req.user;
    console.log("Sending a Connection Request");
    res.send( user.firstName + " has send the Connection Request");
    
})

module.exports = requestRouter;