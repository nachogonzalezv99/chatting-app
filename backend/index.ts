import cors from "cors";
import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
import "./env"

dotenv.config()

console.log(process.env.VITE_TEST)

const app = express();
app.use(json());
app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5174" } });

app.get("/", (req, res) => {
  res.json({ message: "Hey" });
});

io.on("connection", (socket) => {
  socket.on("connected", (msg) => {
    io.emit("connected", msg);
  });

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });

  socket.on("disconnected", (msg) => {
    console.log("disconnection", msg)
    io.emit("disconnected", msg);
  });

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });
});

server.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});
