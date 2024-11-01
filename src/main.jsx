import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import io from "socket.io-client";
import './index.css';

// Socket connection initialization
export const socket = io("localhost:3000", {
  transports: ["websocket"],
});

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App 
        style={{ "backgroundImage": "linear-gradient(to top, #304352 0%, #d7d2cc 100%)" }}
    />
  </React.StrictMode>
);
