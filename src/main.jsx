import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import your styles

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App 
      style={{ backgroundImage: "linear-gradient(to top, #304352 0%, #d7d2cc 100%)" }}
    />
  </React.StrictMode>
);
