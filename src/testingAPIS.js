const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("Helllo, Helllo, Helllo")
});

app.use("/test", (req, res) => {
    res.send("Hello from the test server")
});

// app.use("/", (req, res) => {
//     res.send("Hello from the home page")
// }); 
// keep "/" at the bootom always beacuse
// app.use("/") matches every route
// /, /test, /hello → all start with /
// So Express stops at the first match and never reaches /test or /hello
// That’s why no matter what you click, you always get home page response.


//This will only handle get call api to /user
app.get("/user", (req, res) => {
    res.send("Get the details of the user")
});

//This will only handle post call api to /user
app.post("/user", (req, res) => {
    // saving data to DB
    res.send("Added user to the database")
});

//This will only handle delete call api to /user
app.delete("/user", (req, res) => {
    // deleting data from DB
    res.send("Deleted user from the database")
}); 


app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777");
    
});



// const request = require("supertest");
// const app = require("./app");

// describe("GET /user", () => {
//   test("should return 5th Response", async () => {
//     const response = await request(app).get("/user");

//     expect(response.status).toBe(200);
//     expect(response.text).toBe("5th Response");
//   });
// });
