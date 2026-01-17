const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require ("./middleWare/auth.js");


const app = express()

// converting the json data to js so that js understand
app.use(express.json());
app.use(cookieParser());


// saving our data to databse from postman 
// creating a new instance of the user model
// req.body -> app.use(express.json()); will convert and dump the data into body so that we can use and made it dynamic

// Registering a new user, this is a entry point for our user to signup
app.post("/signup", async (req, res) => {   
    
    try{

        // Validation of Data
        validateSignUpData(req);

        const {firstName, lastName, emailID, password} = new User(req.body);

        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({firstName, lastName, emailID, password: passwordHash})

        await user.save()
        res.send("User adeed successfully");

    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});


app.post("/login", async(req, res) => {
    try{
        const { emailID, password } = req.body;

        const user = await User.findOne({ emailID: emailID});

        if(!user){
            throw new Error ("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            // Create a JWT token
            const token = await user.getJWT();
            
            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000), });

            res.send("Login Successful");

        }else{
            throw new Error ("Invalid credentials");
        }

    }
    catch(err){
        res.status(400).send("Login failed: " + err.message);
    }
});



app.get("/profile", userAuth, async (req, res) => {

    try{
        const user = req.user;
        res.send(user);
    }
    catch{
        res.status(400).send(err.message);;
    }
});



app.post("/sendConnectionRequest", userAuth, async (req, res) => {

    const user = req.user;
    console.log("Sending a Connection Request");
    res.send( user.firstName + " has send the Connection Request");
    
})




connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
            console.log("Server is successfully listening on port 7777"); 
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!"); 
    })


