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
    LECTURER_DELETE_FAILED,
    USER_IMPORT_REQUEST,
    USER_IMPORT_SUCCESS,
    USER_IMPORT_FAILED,
    ADMIN_LOAD_REQUEST,
    ADMIN_LOAD_SUCCESS,
    ADMIN_LOAD_FAILED,
    ADMIN_INSERT_REQUEST,
    ADMIN_INSERT_SUCCESS,
    ADMIN_INSERT_FAILED,
    ADMIN_UPDATE_REQUEST,
    ADMIN_DELETE_REQUEST,
    ADMIN_UPDATE_SUCCESS,
    ADMIN_DELETE_SUCCESS,
    ADMIN_UPDATE_FAILED,
    ADMIN_DELETE_FAILED
} from '../constants/userConstants';

const initialState = {
    isLoading: false,
    students: [],
    lecturers: [],
    admins: [],
    errors: []
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case STUDENT_LOAD_REQUEST:
        case USER_IMPORT_REQUEST:
        case STUDENT_INSERT_REQUEST:
        case STUDENT_UPDATE_REQUEST:
        case STUDENT_DELETE_REQUEST:
        case LECTURER_LOAD_REQUEST:
        case LECTURER_INSERT_REQUEST:
        case LECTURER_UPDATE_REQUEST:
        case LECTURER_DELETE_REQUEST:
        case ADMIN_LOAD_REQUEST:
        case ADMIN_INSERT_REQUEST:
        case ADMIN_UPDATE_REQUEST:
        case ADMIN_DELETE_REQUEST:
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
        case USER_IMPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                students: payload.userType === 'STUDENT' ? payload.users : [],
                lecturers: payload.userType === 'LECTURER' ? payload.users : [],
                admins: payload.userType === 'ADMIN' ? payload.users : [],
                errors: []
            }
        case LECTURER_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                lecturers: payload.lecturers,
                errors: []
            }
        case ADMIN_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                admins: payload.admins,
                errors: []
            }
        case ADMIN_INSERT_SUCCESS:
            return {
                ...state,
                admins: [...state.admins, payload.admin],
                errors: [],
                isLoading: false
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
        case ADMIN_UPDATE_SUCCESS:
            return {
                ...state,
                admins: state.admins.map(admin => {
                    if(admin._id === payload.admin._id) {
                        return payload.admin;
                    }

                    return admin;
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
        case ADMIN_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                admins: state.admins.filter(admin => admin._id !== payload.adminId),
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
        case USER_IMPORT_FAILED:
        case STUDENT_INSERT_FAILED:
        case STUDENT_UPDATE_FAILED:
        case STUDENT_DELETE_FAILED:
        case LECTURER_LOAD_FAILED:
        case LECTURER_INSERT_FAILED:
        case LECTURER_UPDATE_FAILED:
        case LECTURER_DELETE_FAILED:
        case ADMIN_LOAD_FAILED:
        case ADMIN_INSERT_FAILED:
        case ADMIN_UPDATE_FAILED:
        case ADMIN_DELETE_FAILED:
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