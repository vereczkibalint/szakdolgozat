import api from '../../utils/api';
import { persistor } from "../store";

import { 
    authRequested,
    successfulAuth,
    failedAuth,
    logoutAuth
} from '../../common/actions/authActions';

export const adminLogin = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(authRequested());
            const { data } = await api.post('/auth/admin', 
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

export const logout = () => {
    return (dispatch) => {
        dispatch(logoutAuth());
        sessionStorage.clear();
        setTimeout(() => persistor.purge(), 200);
    }
}