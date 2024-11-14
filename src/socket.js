import io from "socket.io-client";

// Initialize the Socket.IO client connection to the server at http://localhost:3000
export const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to Socket.IO server:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});
