import React from 'react';
import ReactDOM from 'react-dom/client'; //  Import ReactDOM correctly
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/authContext.jsx'; //  Ensure correct import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <AuthProvider> {/*  Wrap the App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
