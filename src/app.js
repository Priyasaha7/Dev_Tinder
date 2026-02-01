require("dotenv").config();
require("./utils/cronJob");

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");
const chatRouter = require("./routers/chat");

const initializeSocket = require("./utils/socket");

const cors = require("cors");
const http = require("http");

// creating an express app
const app = express();

// enabling cors for all the routes
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// converting the json data to js so that js understand
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const sendEmail = require("./utils/sendEmail");

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });

// for sending email
// (async () => {
//   const result = await sendEmail(
//     "Connection Request",
//     "You got a connection request from priya.sot010085@pwioi.com",
//     "priyasaha4658000@gmail.com",
//   );
//   console.log("Email send result:", result);
// })();
