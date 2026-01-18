const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");

const app = express()

// converting the json data to js so that js understand
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// saving our data to databse from postman 
// creating a new instance of the user model
// req.body -> app.use(express.json()); will convert and dump the data into body so that we can use and made it dynamic



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


