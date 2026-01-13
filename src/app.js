const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//     console.log(req.query);
//     res.send({ firstname: "Priya", lastname: "Saha"});
// });

app.get("/user/:userID/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({ firstname: "Priya", lastname: "Saha"});
});

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777");
    
});