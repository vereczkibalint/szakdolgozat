import {
    STUDENT_FETCH_REQUESTED,
    STUDENT_FETCH_SUCCESS,
    STUDENT_FETCH_FAILED
} from "../constants/userConstants";

const initialState = {
    isLoading: false,
    students: [],
    errors: []
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case STUDENT_FETCH_REQUESTED:
            return {
                ...state,
                isLoading: true,
                students: [],
                errors: []
            }
        case STUDENT_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: [],
                students: payload.students
            }
        case STUDENT_FETCH_FAILED:
            return {
                ...state,
                isLoading: false,
                students: [],
                errors: payload.errors
            }
        default:
            return state;
    }
}

export default userReducer;