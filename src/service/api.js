import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // URL base para sua API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;