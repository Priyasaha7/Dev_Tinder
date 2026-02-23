const mongoose = require("mongoose");
// mongose is a libraray
const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};

module.exports = connectDB;
