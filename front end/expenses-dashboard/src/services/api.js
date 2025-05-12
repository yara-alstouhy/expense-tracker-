import axios from 'axios';
import Cookies from 'js-cookie'; // npm install js-cookie

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
});

// Automatically attach CSRF token to unsafe methods
api.interceptors.request.use((config) => {
    const csrfToken = Cookies.get('csrftoken');  // Read from cookie
    const method = config.method?.toUpperCase();

    // Only attach for "unsafe" methods
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
});

export default api;
