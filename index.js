const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.broadcast.emit("hie");
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
