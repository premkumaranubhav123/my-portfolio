import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Render the app without React.StrictMode to prevent UNSAFE_componentWillMount warnings
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
