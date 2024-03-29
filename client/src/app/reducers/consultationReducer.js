import {
    CONSULTATION_FETCH_REQUEST,
    CONSULTATION_FETCH_SUCCESS,
    CONSULTATION_FETCH_FAILED,
    CONSULTATION_RESERVE_REQUEST,
    CONSULTATION_RESERVE_SUCCESS,
    CONSULTATION_RESERVE_FAILED,
    CONSULTATION_CANCEL_REQUEST,
    CONSULTATION_CANCEL_SUCCESS,
    CONSULTATION_CANCEL_FAILED,
    CONSULTATION_INSERT_REQUEST,
    CONSULTATION_INSERT_SUCCESS,
    CONSULTATION_INSERT_FAILED,
    CONSULTATION_UPDATE_REQUEST,
    CONSULTATION_UPDATE_SUCCESS,
    CONSULTATION_UPDATE_FAILED,
    CONSULTATION_DELETE_REQUEST,
    CONSULTATION_DELETE_SUCCESS,
    CONSULTATION_DELETE_FAILED,
    CONSULTATION_FETCH_BY_ID_REQUESTED,
    CONSULTATION_FETCH_BY_ID_SUCCESS,
    CONSULTATION_FETCH_BY_ID_FAILED
} from '../constants/consultationConstants';

const initialState = {
    isLoading: false,
    errors: [],
    consultations: []
};

export const consultationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case CONSULTATION_FETCH_REQUEST:
        case CONSULTATION_INSERT_REQUEST:
        case CONSULTATION_RESERVE_REQUEST:
        case CONSULTATION_CANCEL_REQUEST:
        case CONSULTATION_UPDATE_REQUEST:
        case CONSULTATION_DELETE_REQUEST:
        case CONSULTATION_FETCH_BY_ID_REQUESTED:
            return {
                ...state,
                errors: [],
                isLoading: true
            }
        case CONSULTATION_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                consultations: payload.consultations,
                errors: []
            }
        case CONSULTATION_FETCH_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                consultations: [payload.consultation],
                errors: []
            }
        case CONSULTATION_INSERT_SUCCESS:
            return {
                ...state,
                consultations: [...state.consultations, payload.consultation],
                errors: [],
                isLoading: false
            }
        case CONSULTATION_RESERVE_SUCCESS:
        case CONSULTATION_CANCEL_SUCCESS:
        case CONSULTATION_UPDATE_SUCCESS:
            return {
                ...state,
                consultations: state.consultations.map(consultation => {
                    if(consultation._id === payload.consultation._id) {
                        return payload.consultation;
                    }

                    return consultation;
                }),
                isLoading: false,
                errors: []
            }
        case CONSULTATION_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                consultations: state.consultations.filter(consultation => consultation._id !== payload.consultation._id),
                errors: []
            }
        case CONSULTATION_FETCH_FAILED:
        case CONSULTATION_INSERT_FAILED:
        case CONSULTATION_RESERVE_FAILED:
        case CONSULTATION_CANCEL_FAILED:
        case CONSULTATION_UPDATE_FAILED:
        case CONSULTATION_DELETE_FAILED:
        case CONSULTATION_FETCH_BY_ID_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: payload.errors
            }
        default:
            return state;
    }
}

export default consultationReducer;