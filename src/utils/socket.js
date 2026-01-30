const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connections", (socket) => {
    // Handle events
  });
};

module.exports = initializeSocket;
