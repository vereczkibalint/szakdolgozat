import {
    MILESTONE_FETCH_REQUEST,
    MILESTONE_FETCH_SUCCESS,
    MILESTONE_FETCH_FAILED,
    MILESTONE_INSERT_REQUEST,
    MILESTONE_INSERT_SUCCESS,
    MILESTONE_INSERT_FAILED,
    MILESTONE_UPDATE_REQUEST,
    MILESTONE_UPDATE_SUCCESS,
    MILESTONE_UPDATE_FAILED,
    MILESTONE_DELETE_REQUEST,
    MILESTONE_DELETE_SUCCESS,
    MILESTONE_DELETE_FAILED,
    MILESTONE_STATUS_CHANGE_REQUESTED,
    MILESTONE_STATUS_CHANGE_SUCCESS,
    MILESTONE_STATUS_CHANGE_FAILED,
    MILESTONE_COMMENT_INSERT_REQUESTED,
    MILESTONE_COMMENT_INSERT_SUCCESS,
    MILESTONE_COMMENT_INSERT_FAILED,
    MILESTONE_FETCH_BY_ID_REQUESTED,
    MILESTONE_FETCH_BY_ID_SUCCESS,
    MILESTONE_FETCH_BY_ID_FAILED,
    MILESTONE_COMMENT_DELETE_REQUESTED,
    MILESTONE_COMMENT_DELETE_SUCCESS,
    MILESTONE_COMMENT_DELETE_FAILED,
    MILESTONE_COMMENT_UPDATE_REQUESTED,
    MILESTONE_COMMENT_UPDATE_SUCCESS,
    MILESTONE_COMMENT_UPDATE_FAILED
} from '../constants/milestoneConstants';

const initialState = {
    isLoading: false,
    errors: [],
    milestones: []
};

export const milestoneReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case MILESTONE_FETCH_REQUEST:
        case MILESTONE_INSERT_REQUEST:
        case MILESTONE_UPDATE_REQUEST:
        case MILESTONE_DELETE_REQUEST:
        case MILESTONE_STATUS_CHANGE_REQUESTED:
        case MILESTONE_COMMENT_INSERT_REQUESTED:
        case MILESTONE_FETCH_BY_ID_REQUESTED:
        case MILESTONE_COMMENT_DELETE_REQUESTED:
        case MILESTONE_COMMENT_UPDATE_REQUESTED:
        return {
            ...state,
            errors: [],
            isLoading: true
        }
        case MILESTONE_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                milestones: payload.milestones,
                errors: []
            }
        case MILESTONE_FETCH_BY_ID_SUCCESS:
        case MILESTONE_COMMENT_DELETE_SUCCESS:
        case MILESTONE_COMMENT_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                milestones: [payload.milestone],
                errors: []
            }
        case MILESTONE_INSERT_SUCCESS:
            return {
                ...state,
                milestones: [...state.milestones, payload.milestone],
                errors: [],
                isLoading: false
            }
        case MILESTONE_UPDATE_SUCCESS:
        case MILESTONE_STATUS_CHANGE_SUCCESS:
        case MILESTONE_COMMENT_INSERT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                milestones: [payload.milestone],
                errors: []
            }
        case MILESTONE_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                milestones: state.milestones.filter(milestone => milestone._id !== payload.milestoneId),
                errors: []
            }
        case MILESTONE_FETCH_FAILED:
        case MILESTONE_INSERT_FAILED:
        case MILESTONE_UPDATE_FAILED:
        case MILESTONE_DELETE_FAILED:
        case MILESTONE_STATUS_CHANGE_FAILED:
        case MILESTONE_COMMENT_INSERT_FAILED:
        case MILESTONE_FETCH_BY_ID_FAILED:
        case MILESTONE_COMMENT_DELETE_FAILED:
        case MILESTONE_COMMENT_UPDATE_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: payload.errors,
                milestones: []
            }
        default:
            return state;
    }
}

export default milestoneReducer;