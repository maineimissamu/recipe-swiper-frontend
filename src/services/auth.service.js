import api from '../utils/api';

const register = async (username, email, password) => {
    try {
        const response = await api.post('/auth/register', {username, email, password});
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
        const response = await api.post('/auth/login', {email, password});
        if(response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch(err) {
        throw err;
    }
}

export { register, login, api };