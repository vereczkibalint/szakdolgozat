import api from '../../utils/api';

import {
    AUTH_REQUEST,
    AUTH_LOAD_USER,
    AUTH_LOAD_USER_FAILED,
    AUTH_SUCCESS,
    AUTH_FAILED,
    AUTH_LOGOUT
} from '../constants/authConstants';

export const loadUser = () => async (dispatch) => {
    try {
        // TODO
    } catch (error) {
        const { data } = error.response;
        dispatch({
            type: AUTH_LOAD_USER_FAILED.LOGOUT,
            payload: data
        });
    }
}

export const adminLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_REQUEST
        });

        const { data } = await api.post('/auth/admin', 
                                { email, password });

        dispatch({
            type: AUTH_SUCCESS,
            payload: data
        });

        localStorage.setItem('user', JSON.stringify(data.user));
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
}

export const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }