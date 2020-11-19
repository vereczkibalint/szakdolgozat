import api from '../utils/api';

import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    AUTH_LOGOUT
} from '../constants/authConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_REQUEST
        });

        const { data } = await axios.post('/auth/login', 
                                { email, password });

        dispatch({
            type: AUTH_SUCCESS,
            payload: data
        });

        localStorage.setItem('user', data.user);
        localStorage.setItem('token', data.token);
    } catch (error) {
        const { data } = error.response;
        dispatch({
            type: AUTH_FAILED,
            payload: data
        });
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    dispatch({
        type: AUTH_LOGOUT
    });
    document.location.href = '/admin';
}