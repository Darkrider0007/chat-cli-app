const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve the public folder for browser clients
app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
  let user = "Anonymous";

  socket.on("join", (username) => {
    user = username;
    io.emit("chat message", {
      user: "🟢",
      message: `${user} joined the chat`,
      time: new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    });
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", {
      user,
      message: msg,
      time: new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    });
  });

  socket.on("disconnect", () => {
    io.emit("chat message", {
      user: "🔴",
      message: `${user} left the chat`,
      time: new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
