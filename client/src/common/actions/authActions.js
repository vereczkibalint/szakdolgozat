import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    AUTH_LOGOUT
} from '../../admin/constants/authConstants';

export const authRequested = () => {
    return {
        type: AUTH_REQUEST
    }
}

export const successfulAuth = (token, user) => {
    return {
        type: AUTH_SUCCESS,
        payload: {
            token,
            user
        }
    }
}

export const failedAuth = (errors) => {
    return {
        type: AUTH_FAILED,
        payload: errors
    }
}

export const logoutAuth = () => {
    return {
        type: AUTH_LOGOUT
    }
}