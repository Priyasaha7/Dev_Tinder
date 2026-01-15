const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://priya07_db_user:Test12345@curiousnode.aegl1gk.mongodb.net/devTinder"
    );
};

module.exports = connectDB