const express = require("express");

const app = express();


// GET /users  => middleware chain => request handler
app.use("/", (req, res, next) => {
    console.log("home");
    next()
    
})


// it will match "/" first then go the next , if next not there it will execute there 
app.get("/user", (req, res, next) => {
    console.log("Handling the route user 1!");
    //res.send("1st Response");
    next()
},

(req, res, next) => {
    next()
},

(req, res, next) => {
    console.log("Handling the route user 2!");
    res.send("2nd Response");
    
},

);

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000");
    
});