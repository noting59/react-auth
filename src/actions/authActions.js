import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';
import jwt from 'jsonwebtoken';


export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function login(userData) {
    return dispatch => {
        return axios.post('http://localhost:8000/api/v1/login', { email: userData.email, password: userData.password }).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwt.decode(token)));
        });
    }
}

export function logout() {
    return dispatch => {
        return axios.post('http://localhost:8000/api/v1/logout', {token: localStorage.jwtToken}).then(res => {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');
            setAuthorizationToken(false);
            dispatch(setCurrentUser({}));
        });
    }
}
