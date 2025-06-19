import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const register = async (username, email, password) => {
    try {
        const response = await api.post('/register', {username, email, password});
        if(response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch(err) {
        throw err;
    }
}

const login = async (email, password) => {
    try {
        const response = await api.post('/login', {email, password});
        if(response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch(err) {
        throw err;
    }
}

export { register, login, api };