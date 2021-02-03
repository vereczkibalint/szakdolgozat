import {
    STUDENT_FETCH_REQUESTED,
    STUDENT_FETCH_SUCCESS,
    STUDENT_FETCH_FAILED,
    STUDENT_IMPORT_REQUESTED,
    STUDENT_IMPORT_SUCCESS,
    STUDENT_IMPORT_FAILED,
    STUDENT_DELETE_REQUESTED, STUDENT_DELETE_SUCCESS, STUDENT_DELETE_FAILED
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
        case STUDENT_IMPORT_REQUESTED:
        case STUDENT_DELETE_REQUESTED:
            return {
                ...state,
                isLoading: true,
                errors: []
            }
        case STUDENT_FETCH_SUCCESS:
        case STUDENT_IMPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: [],
                students: payload.students
            }
        case STUDENT_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: [],
                students: state.students.filter(student => student._id !== payload.student._id)
            }
        case STUDENT_FETCH_FAILED:
        case STUDENT_IMPORT_FAILED:
        case STUDENT_DELETE_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: payload.errors
            }
        default:
            return state;
    }
}

export default userReducer;