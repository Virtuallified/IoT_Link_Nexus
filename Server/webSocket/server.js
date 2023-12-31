const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Not recommended in Production
    // origin: `${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT || "80"}`,
  },
});

// Listen for web socket connections
io.on("connection", (socket) => {
  const clientIP = socket.handshake.address; // Get the client's IP address
  console.log(`WS-client connected from IP: ${clientIP}`);

  // Listen for the 'updateLiveStatus' event
  socket.on("updateLiveStatus", (data) => {
    // Emit the 'liveStatusUpdate' event to other clients
    socket.broadcast.emit("liveStatusUpdate", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`WS-client disconnected from IP: ${clientIP}`);
  });
});

module.exports = server;
