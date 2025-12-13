// src/index.js (UPDATED)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';

// Initialize auth token from localStorage
const token = localStorage.getItem('token');
if (token) {
    // Validate token by making a simple request
    fetch('http://localhost:8080/api/auth/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        if (!response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);