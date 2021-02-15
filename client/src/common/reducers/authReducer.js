import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    AUTH_LOGOUT, AUTH_CHANGE_PASSWORD_REQUEST, AUTH_CHANGE_PASSWORD_SUCCESS, AUTH_CHANGE_PASSWORD_FAILED
} from '../constants/authConstants';

const initialState = {
    loading: false,
    isAuthenticated: false,
    token: null,
    user: null,
    passwordChangeMessage: undefined
};

const authLoginReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case AUTH_REQUEST:
        case AUTH_CHANGE_PASSWORD_REQUEST:
            return { 
                ...state,
                loading: true,
                passwordChangeMessage: undefined
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                error: [],
                loading: false,
                token: payload.token,
                user: payload.user,
                isAuthenticated: true
            }
        case AUTH_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                error: [],
                loading: false,
                user: payload.user,
                passwordChangeMessage: "Sikeres jelszómódosítás!"
            }
        case AUTH_CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                error: payload.errors,
                loading: false,
                passwordChangeMessage: undefined
            }
        case AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
                isAuthenticated: false
            }
        case AUTH_LOGOUT:
            return {}
        default:
            return state;
    }
}

export default authLoginReducer;