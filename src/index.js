// Libraries. 
import React from 'react';
import ReactDOM from 'react-dom';

// Main application component.
import App from './App';

// Import translation config.
import './i18nextConf';

// Imporing Bootstrap libraries, generated by bootstrap-react.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Root renderer.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);