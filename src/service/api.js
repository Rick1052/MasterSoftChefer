import axios from 'axios';

const api = axios.create({
    baseURL: 'https://master-soft-chef.netlify.app', // URL base para sua API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;