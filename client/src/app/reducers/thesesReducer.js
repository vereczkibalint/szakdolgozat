import {
    THESES_FETCH_REQUEST,
    THESES_FETCH_SUCCESS,
    THESES_FETCH_FAILED,
    THESIS_INSERT_REQUEST,
    THESIS_INSERT_SUCCESS,
    THESIS_INSERT_FAILED,
    THESIS_UPDATE_REQUEST,
    THESIS_UPDATE_SUCCESS,
    THESIS_UPDATE_FAILED,
    THESIS_DELETE_REQUEST,
    THESIS_DELETE_SUCCESS,
    THESIS_DELETE_FAILED,
    THESES_FETCH_BY_STUDENT_REQUEST,
    THESES_FETCH_BY_STUDENT_SUCCESS,
    THESES_FETCH_BY_STUDENT_FAILED, THESIS_FETCH_BY_ID_REQUESTED, THESIS_FETCH_BY_ID_SUCCESS, THESIS_FETCH_BY_ID_FAILED
} from '../constants/thesesConstants';

const initialState = {
    isLoading: false,
    theses: [],
    errors: []
};

const thesesReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case THESES_FETCH_REQUEST:
        case THESES_FETCH_BY_STUDENT_REQUEST:
        case THESIS_INSERT_REQUEST:
        case THESIS_UPDATE_REQUEST:
        case THESIS_DELETE_REQUEST:
        case THESIS_FETCH_BY_ID_REQUESTED:
            return {
                ...state,
                errors: [],
                isLoading: true
            }
        case THESES_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                theses: payload.theses,
                errors: []
            }
        case THESES_FETCH_BY_STUDENT_SUCCESS:
        case THESIS_FETCH_BY_ID_SUCCESS:
            return {
                ...state,
                theses: [payload.thesis],
                isLoading: false,
                errors: []
            }
        case THESIS_INSERT_SUCCESS:
            return {
                ...state,
                theses: [...state.theses, payload.thesis],
                errors: [],
                isLoading: false
            }
        case THESIS_UPDATE_SUCCESS:
            return {
                ...state,
                theses: state.theses.map(thesis => {
                    if(thesis._id === payload.thesis._id) {
                        return payload.thesis;
                    }

                    return thesis;
                }),
                isLoading: false,
                errors: []
            }
        case THESIS_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                theses: state.theses.filter(thesis => thesis._id !== payload.thesisId),
                errors: []
            }
        case THESES_FETCH_FAILED:
        case THESIS_FETCH_BY_ID_FAILED:
        case THESES_FETCH_BY_STUDENT_FAILED:
        case THESIS_INSERT_FAILED:
        case THESIS_UPDATE_FAILED:
        case THESIS_DELETE_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: payload.errors
            }
        default:
            return state;
    }
}

export default thesesReducer;