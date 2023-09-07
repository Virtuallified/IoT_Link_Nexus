const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

// Listen for web socket connections
io.on("connection", (socket) => {
  console.log("WebSocket connected");

  // Listen for the 'updateLiveStatus' event
  socket.on("updateLiveStatus", (data) => {
    // Emit the 'liveStatusUpdate' event to other clients
    socket.broadcast.emit("liveStatusUpdate", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
});

const PORT = process.env.PORT || 3011;

server.listen(PORT, () => {
  console.log(`Server successfully started on port: ${PORT}`);
});
