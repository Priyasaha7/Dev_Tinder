const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express()

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Priyanka",
        lastName: "lala",
        emailID: "priyanka@gmail.com",
        password: "priyasaha",
    })

    await user.save()
    res.send("User adeed successfully");
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


