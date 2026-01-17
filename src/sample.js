const express = require("express");

const { adminAuth, userAuth } = require("./middleWare/sampleAuth")

const app = express();

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.use("/user", (req, res) => {
    res.send("User data send")
});

app.use("/admin/getAllData", (req, res) => {
    res.send("All Data Sent")
});

app.use("/admin/delete", (req, res) => {
    res.send("Deleted a user")
});



// app.use("/user", (req, res) => {
//     console.log(req.query);
//     res.send({ firstname: "Priya", lastname: "Saha"});
// });

// app.get("/user/:userID/:name/:password", (req, res) => {
//     console.log(req.params);
//     res.send({ firstname: "Priya", lastname: "Saha"});
// });

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777");
    
});