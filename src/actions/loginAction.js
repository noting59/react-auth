import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';


export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function login(userData) {
    return dispatch => {
        return axios.post('http://localhost:8000/api/v1/login', { email: userData.email, password: userData.password }).then(res => {
            const user = res.data.user;
            const token = res.data.token;
            console.log(token);
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuthorizationToken(token);
            dispatch(setCurrentUser(user));
        });
    }
}
