import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import router from "./routes/index.js";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

const app = express();

const ioServer = createServer(app);
const io = new SocketIOServer(ioServer, {
  cors: {
    origin: "http://localhost:8000"
  },
});

const port = "8000"; // For ViteExpress server
const socketPort = "3000"; // For Socket.IO server

ViteExpress.config({ printViterDevServerHost: true });
// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);
app.use(cors());

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    for (let room of data) {
      socket.join(room.chatId);
    }
  });

  socket.on("send_message", (data) => {
    console.log(data);
    io.to(data.chatId).emit("receive_message", data);
  });
});

app.use(router);

// Socket.IO server listens on port 3000
ioServer.listen(socketPort, () => {
  console.log('Socket.IO server listening on *:3000');
});

// ViteExpress server listens on port 8000
ViteExpress.listen(app, port, () => console.log("Vite/Express server is listening on *:8000"));
