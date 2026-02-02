const express = require("express");
const connectDB = require("../src/config/database.js");
const User = require("../src/models/user.js");
const { validateSignUpData } = require("../src/utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../src/middleWare/auth.js");

const app = express();

// converting the json data to js so that js understand
app.use(express.json());
app.use(cookieParser());

// saving our data to databse from postman
// creating a new instance of the user model
// req.body -> app.use(express.json()); will convert and dump the data into body so that we can use and made it dynamic

// Registering a new user, this is a entry point for our user to signup
app.post("/signup", async (req, res) => {
  try {
    // Validation of Data
    validateSignUpData(req);

    const { firstName, lastName, emailID, password } = new User(req.body);

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    await user.save();
    res.send("User adeed successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Create a JWT token
      const token = await jwt.sign({ _id: user._id }, "DEV@TINDER#2004", {
        expiresIn: "1d",
      });

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token);

      res.send("Login Successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Login failed: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch {
    res.status(400).send(err.message);
  }
});

//getting our data from the databse
// Get user by emailID

// For finding one user
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailID;
    const user = await User.findOne({ emailID: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

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
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// Delete api
app.delete("/user", async (req, res) => {
  const userID = req.body.userID;
  try {
    //const user = await User.findByIdAndDelete({userID});
    const user = await User.findByIdAndDelete({ _id: userID });
    res.send("User deleted successfully");
  } catch {
    res.status(400).send("Something went wrong");
  }
});

// Update data
app.patch("/user/:userID", async (req, res) => {
  const userID = req.params?.userID;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "about", "skills", "photoUrl", "gender"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error(" Update is not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error(" Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userID }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);

    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update failed: " + err.message);
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
  });
