import {
    STUDENT_LOAD_REQUEST,
    STUDENT_LOAD_SUCCESS,
    STUDENT_LOAD_FAILED,
    STUDENT_INSERT_REQUEST,
    STUDENT_INSERT_SUCCESS,
    STUDENT_INSERT_FAILED,
    STUDENT_UPDATE_REQUEST,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAILED,
    STUDENT_DELETE_REQUEST,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_FAILED
} from '../constants/studentConstants';

const initialState = {
    isLoading: false,
    students: [],
    errors: []
};

const studentReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case STUDENT_LOAD_REQUEST:
        case STUDENT_INSERT_REQUEST:
        case STUDENT_UPDATE_REQUEST:
        case STUDENT_DELETE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case STUDENT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                students: payload.students,
                errors: []
            }
        case STUDENT_INSERT_SUCCESS:
            return {
                ...state,
                students: [...state.students, payload.student]
            }
        case STUDENT_UPDATE_SUCCESS:
            return {
                ...state,
                students: state.students.map(student => {
                    if(student._id === payload.student._id) {
                        return payload.student;
                    }

                    return student;
                })
            }
        case STUDENT_DELETE_SUCCESS: 
            return {
                ...state,
                students: state.students.filter(student => student._id !== payload.studentId)
            }
        case STUDENT_LOAD_FAILED:
        case STUDENT_INSERT_FAILED:
        case STUDENT_UPDATE_FAILED:
        case STUDENT_DELETE_FAILED:
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

export default studentReducer;