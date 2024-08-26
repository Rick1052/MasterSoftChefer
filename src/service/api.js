import axios from 'axios';

const api = axios.create({
    baseURL: 'http://master-soft-chef/.netlify/', // URL base para sua API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;