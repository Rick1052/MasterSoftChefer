import axios from 'axios';

// Configuração base para a API
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // URL base da API
});

export default api;