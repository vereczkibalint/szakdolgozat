import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    AUTH_LOGOUT,
    AUTH_LOAD_USER,
    AUTH_LOAD_USER_FAILED
} from '../constants/authConstants';

const initialState = {
    loading: false,
    isAuthenticated: false,
    token: null,
    user: null
};

const authLoginReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case AUTH_REQUEST:
            return { 
                ...state,
                loading: true
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload.token,
                user: payload.user,
                isAuthenticated: true
            }
        case AUTH_LOAD_USER:
            return {
                ...state,
                loading: false,
                user: payload.user,
                token: localStorage.token,
                isAuthenticated: true
            }
        case AUTH_LOAD_USER_FAILED:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
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