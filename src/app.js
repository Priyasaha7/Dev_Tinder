const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express()

// converting the json data to js so that js understand
app.use(express.json());


// saving our data to databse from postman 
// creating a new instance of the user model
// req.body -> app.use(express.json()); will convert and dump the data into body so that we can use and made it dynamic


app.post("/signup", async (req, res) => {
    const user = new User(req.body)
    console.log(req.body);
    

    try{
        await user.save()
        res.send("User adeed successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});



//getting our data from the databse 
// Get user by emailID

// For finding one user
app.get("/user", async(req, res) => {
    try{
        const userEmail = req.body.emailID;    
        const user = await User.findOne({emailID:userEmail});        
        if(user.length === 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }
    }catch(err){
        res.status(404).send("Something went wrong");
    }
})


// For Finding Users

// app.get("/user", async(req, res) => {
//     try{
//         const userEmail = req.body.emailID;    
//         const user = await User.find({emailID:userEmail});

//         if(user.length === 0){
//             res.status(404).send("User not found");
//         }
//         else{
//             res.send(user);
//         }
//     }catch(err){
//         res.status(404).send("Something went wrong");
//     }
// })












//Feed api - GET /feed -> get all the users from the databse
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
})


// Delete api 
app.delete("/user", async(req, res) => {
    const userID = req.body.userID;
    try{
        //const user = await User.findByIdAndDelete({userID});
        const user = await User.findByIdAndDelete({ _id: userID});
        res.send("User deleted successfully");
    }catch{
        res.status(400).send("Something went wrong");
    }
});



// Update data
app.patch("/user", async(req, res) => {
    const userID = req.body.userID;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate({ _id: userID}, data,{ 
            returnDocument: "before",
         });
        console.log(user);
        
        res.send("User updated successfully");
    }catch{
        res.status(400).send("Something went wrong");
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


