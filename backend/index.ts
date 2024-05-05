import cors from "cors";
import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(json())
app.use(cors())

const server = createServer(app);
const io = new Server(server, {cors:{origin: "http://localhost:5173"}});



app.get("/", (req, res) => {
  res.json({ message: "Hey" });
});

io.on("connection", (socket) => {
    console.log("connected")
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });
});

server.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});
