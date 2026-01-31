const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = { Chat };
