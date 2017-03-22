import axios from 'axios';

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('http://localhost:8000/api/v1/register', { name: userData.name, email: userData.email, password: userData.password, password_confirmation: userData.password_confirmation });
    }
}