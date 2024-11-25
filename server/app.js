import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import router from "./routes/index.js";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

const app = express();
const port = 8000; // Port for ViteExpress server
const socketPort = 3000; // Port for Socket.IO server

// Configure middlewares for ViteExpress server
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:8000", credentials: false }));
app.use(
  session({
    secret: "ssshhhhh",
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false, httpOnly: true },
  })
);

// Use your router for the main app routes
app.use(router);

// Start ViteExpress server on port 8000
ViteExpress.listen(app, port, () =>
  console.log("Vite/Express server is listening on *:8000")
);

// Separate Socket.IO Server for Real-time Communication
const ioServer = createServer(); // No need to pass `app` here
const io = new SocketIOServer(ioServer, {
  cors: {
    origin: "http://localhost:8000", // Make sure this matches the ViteExpress port
    methods: ["GET", "POST"],
    credentials: false,
  },
});

// Set up Socket.IO connection and events
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log("join_room event received with data:", data);
    for (let room of data) {
      socket.join(room.chatId);
      console.log(`User joined room ${room.chatId}`);
    }
    socket.emit("join_room_success"); // Confirm room join to client
  });

  socket.on("send_message", (data) => {
    console.log("send_message event received:", data);
    io.to(data.chatId).emit("receive_message", data);
  });
});

// Start Socket.IO server on port 3000
ioServer.listen(socketPort, () => {
  console.log("Socket.IO server listening on *:3000");
});
