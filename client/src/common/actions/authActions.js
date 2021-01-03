import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    AUTH_LOGOUT, AUTH_CHANGE_PASSWORD_REQUEST, AUTH_CHANGE_PASSWORD_SUCCESS, AUTH_CHANGE_PASSWORD_FAILED
} from '../constants/authConstants';

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

export const passwordChangeRequested = () => {
    return {
        type: AUTH_CHANGE_PASSWORD_REQUEST
    }
}

export const passwordChangeSuccess = (user) => {
    return {
        type: AUTH_CHANGE_PASSWORD_SUCCESS,
        payload: {
            user
        }
    }
}

export const passwordChangeFailed = (errors) => {
    return {
        type: AUTH_CHANGE_PASSWORD_FAILED,
        payload: {
            errors
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