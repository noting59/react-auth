import axios from 'axios';

export function login(userData) {
    return dispatch => {
        return axios.post('http://localhost:8000/api/v1/login', { email: userData.email, password: userData.password });
    }
}