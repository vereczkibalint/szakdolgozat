import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    AUTH_LOGOUT
} from '../constants/authConstants';

const authLoginReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch(type) {
        case AUTH_REQUEST:
            return { 
                loading: true
            }
        case AUTH_SUCCESS:
            return { 
                loading: false, token: payload.token, user: payload.user
            }
        case AUTH_FAILED:
            return {
                loading: false,
                error: payload
            }
        case AUTH_LOGOUT:
            return {}
        default:
            return state;
    }
}

export default authLoginReducer;