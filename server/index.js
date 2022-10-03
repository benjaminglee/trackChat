const mongoose = require("mongoose");
const Message = require("./Message");
mongoose.connect("mongodb://localhost/trackchat");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("send_message", async (data) => {
    await Message.create({
      name: data.name,
      message: data.message,
      room: data.room,
      sent: data.createdAt,
      user: data.user,
    });
    socket.to(data.room).emit("receive_message", data);
    console.log("sent the data", data);
  });

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`User ${data.user} joined room: ${data.room}`);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
server.listen(3001, () => console.log("server running"));
