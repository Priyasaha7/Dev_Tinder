const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express()

// converting the json data to js so that js understand
app.use(express.json());

app.post("/signup", async (req, res) => {
    // creating a new instance of the user model
    // req.body -> app.use(express.json()); will convert and dump the data into body so that we can use and made it dynamic
    const user = new User(req.body)
    console.log(req.body);
    

    try{
        await user.save()
        res.send("User adeed successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});


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


