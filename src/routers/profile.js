const express = require("express");
const {userAuth} = require ("../middleWare/auth.js");


const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {

    try{
        const user = req.user;
        res.send(user);
    }
    catch{
        res.status(400).send(err.message);;
    }
});

module.exports = profileRouter;