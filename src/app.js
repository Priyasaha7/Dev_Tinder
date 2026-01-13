const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("Helllo, Helllo, Helllo")
});

app.use("/test", (req, res) => {
    res.send("Hello from the test server")
});

app.use("/", (req, res) => {
    res.send("Hello from the home page")
}); 
// keep "/" at the bootom always beacuse
// app.use("/") matches every route
// /, /test, /hello → all start with /
// So Express stops at the first match and never reaches /test or /hello
// That’s why no matter what you click, you always get home page response.

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777");
    
});