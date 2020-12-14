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
    STUDENT_DELETE_FAILED,
    LECTURER_LOAD_REQUEST,
    LECTURER_LOAD_SUCCESS,
    LECTURER_LOAD_FAILED,
    LECTURER_INSERT_REQUEST,
    LECTURER_INSERT_SUCCESS,
    LECTURER_INSERT_FAILED,
    LECTURER_UPDATE_REQUEST,
    LECTURER_UPDATE_SUCCESS,
    LECTURER_UPDATE_FAILED,
    LECTURER_DELETE_REQUEST,
    LECTURER_DELETE_SUCCESS,
    LECTURER_DELETE_FAILED
} from '../constants/userConstants';

const initialState = {
    isLoading: false,
    students: [],
    lecturers: [],
    errors: []
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case STUDENT_LOAD_REQUEST:
        case STUDENT_INSERT_REQUEST:
        case STUDENT_UPDATE_REQUEST:
        case STUDENT_DELETE_REQUEST:
        case LECTURER_LOAD_REQUEST:
        case LECTURER_INSERT_REQUEST:
        case LECTURER_UPDATE_REQUEST:
        case LECTURER_DELETE_REQUEST:
            return {
                ...state,
                errors: [],
                isLoading: true
            }
        case STUDENT_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                students: payload.students,
                errors: []
            }
        case LECTURER_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                lecturers: payload.lecturers,
                errors: []
            }
        case STUDENT_INSERT_SUCCESS:
            return {
                ...state,
                students: [...state.students, payload.student],
                errors: [],
                isLoading: false
            }
        case LECTURER_INSERT_SUCCESS:
            return {
                ...state,
                lecturers: [...state.lecturers, payload.lecturer],
                errors: [],
                isLoading: false
            }
        case STUDENT_UPDATE_SUCCESS:
            return {
                ...state,
                students: state.students.map(student => {
                    if(student._id === payload.student._id) {
                        return payload.student;
                    }

                    return student;
                }),
                isLoading: false,
                errors: []
            }
        case LECTURER_UPDATE_SUCCESS:
            return {
                ...state,
                lecturers: state.lecturers.map(lecturer => {
                    if(lecturer._id === payload.lecturer._id) {
                        return payload.lecturer;
                    }

                    return lecturer;
                }),
                isLoading: false,
                errors: []
            }
        case LECTURER_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                lecturers: state.lecturers.filter(lecturer => lecturer._id !== payload.lecturerId),
                errors: []
            }
        case STUDENT_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                students: state.students.filter(student => student._id !== payload.studentId),
                errors: []
            }
        case STUDENT_LOAD_FAILED:
        case STUDENT_INSERT_FAILED:
        case STUDENT_UPDATE_FAILED:
        case STUDENT_DELETE_FAILED:
        case LECTURER_LOAD_FAILED:
        case LECTURER_INSERT_FAILED:
        case LECTURER_UPDATE_FAILED:
        case LECTURER_DELETE_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: payload.errors,
            }
        default:
            return state;
    }
}

export default userReducer;