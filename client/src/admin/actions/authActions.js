import {
    AUTH_REQUEST,
    AUTH_LOAD_USER,
    AUTH_LOAD_USER_FAILED,
    AUTH_SUCCESS,
    AUTH_FAILED,
    AUTH_LOGOUT
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

export const userLoaded = (user) => {
    return {
        type: AUTH_LOAD_USER,
        payload: {
            user
        }
    }
}

export const userLoadFailed = (errors) => {
    return {
        type: AUTH_LOAD_USER_FAILED,
        payload: errors
    }
}