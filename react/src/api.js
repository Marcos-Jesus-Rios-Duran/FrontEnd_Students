// src/api.js
import axios from 'axios';

const apiUrl = 'http://192.168.1.72:3000/api/students'; // URL base de tu API con el prefijo

const api = axios.create({
    baseURL: apiUrl,
});

export default api;
