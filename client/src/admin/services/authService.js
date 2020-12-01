import api from '../../utils/api';

import { authRequested, successfulAuth, failedAuth, logoutAuth, userLoaded, userLoadFailed } from '../actions/authActions';

export const loadUser = () => {
    return async (dispatch) => {
        try {
            const { data } = await api.get('/auth');
            dispatch(userLoaded(data));
        } catch (error) {
            const { data } = error.response;
            dispatch(userLoadFailed(data));
        }
    }
}

export const adminLogin = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(authRequested());

            const { data } = await api.post('/auth/admin', 
                                    { email, password });

            dispatch(successfulAuth(data.token, data.user));

            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
        } catch (error) {
            const { data } = error.response;
            dispatch(failedAuth(data));
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        dispatch(logoutAuth());
    }
}

export const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common = {'Authorization': `Bearer ${token}`}    
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
}