const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            throw new Error("Invalid Token");
        };

        const decodedObj = jwt.verify( token , "DEV@TINDER#2004");
        const { _id } = decodedObj;

        const user = await User.findById({ _id });

        if(!user){
            throw new Error("User not found");
        };

        req.user = user;
        next();
    }

    catch(err){
        res.status(401).send("Unauthorized: No token provided");
    }
};

module.exports = {userAuth};