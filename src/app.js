require("dotenv").config();
require("./utils/cronJob");

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");

const cors = require("cors");

// creating an express app
const app = express();

// enabling cors for all the routes
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// converting the json data to js so that js understand
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const sendEmail = require("./utils/sendEmail");
// saving our data to databse from postman
// creating a new instance of the user model
// req.body -> app.use(express.json()); will convert and dump the data into body so that we can use and made it dynamic

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });

(async () => {
  const result = await sendEmail(
    "Connection Request",
    "You got a connection request from priya.sot010085@pwioi.com",
    "priyasaha4658000@gmail.com",
  );
  console.log("Email send result:", result);
})();
