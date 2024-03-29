import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import io from "socket.io-client";
import './index.css';

export const socket = io("localhost:3000", {
  transports: ["websocket"],
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
