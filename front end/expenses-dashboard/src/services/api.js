// services/api.js
import axios from 'axios';
import Cookies from 'js-cookie'; // npm install js-cookie

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true, // Ensure cookies like CSRF are sent/received
});

// Add CSRF token and Bearer token to every request automatically
api.interceptors.request.use((config) => {
    const csrfToken = Cookies.get('csrftoken');
    const token = localStorage.getItem('token');
    const method = config.method?.toUpperCase();

    // Only add CSRF token for unsafe methods
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => Promise.reject(error));

export default api;
