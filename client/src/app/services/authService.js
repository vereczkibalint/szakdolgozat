import api from '../../utils/api';
import { persistor } from "../store";

import {
    authRequested,
    successfulAuth,
    failedAuth,
    logoutAuth, passwordChangeRequested, passwordChangeSuccess, passwordChangeFailed
} from '../../common/actions/authActions';

export const userLogin = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(authRequested());
            const { data } = await api.post('/auth',
                { email, password });

            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.user));

            dispatch(successfulAuth(data.token, data.user));
        } catch (error) {
            const { data } = error.response;
            dispatch(failedAuth(data));
        }
    }
}

export const changePassword = (oldPassword, newPassword) => {
    return async (dispatch) => {
        try {
            dispatch(passwordChangeRequested());
            const { data } = await api.post('/users/change_password', {
                oldPassword,
                password: newPassword
            });
            dispatch(passwordChangeSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(passwordChangeFailed(data));
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(logoutAuth());
        sessionStorage.clear();
        setTimeout(() => persistor.purge(), 200);
    }
}