import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optimized and minified CSS

// Lazy load the App component
const App = lazy(() => import('./App.jsx'));

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
