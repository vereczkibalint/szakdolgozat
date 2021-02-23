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
    ADMIN_LOAD_SUCCESS, ADMIN_LOAD_FAILED
} from "../constants/userConstants";

export const studentLoadRequested = () => {
    return {
        type: STUDENT_LOAD_REQUEST
    }
}

export const studentLoadSuccess = (students) => {
    return {
        type: STUDENT_LOAD_SUCCESS,
        payload: {
            students
        }
    }
}

export const studentLoadFailed = (errors) => {
    return {
        type: STUDENT_LOAD_FAILED,
        payload: {
            errors
        }
    }
}

export const userImportRequested = () => {
    return {
        type: USER_IMPORT_REQUEST
    }
}

export const userImportSuccess = (users) => {
    return {
        type: USER_IMPORT_SUCCESS,
        payload: {
            users,
            userType: users[0].role
        }
    }
}

export const userImportFailed = (errors) => {
    return {
        type: USER_IMPORT_FAILED,
        payload: {
            errors
        }
    }
}

export const studentInsertRequested = () => {
    return {
        type: STUDENT_INSERT_REQUEST
    }
}

export const studentInsertSuccess = (student) => {
    return {
        type: STUDENT_INSERT_SUCCESS,
        payload: {
            student
        }
    }
}

export const studentInsertFailed = (errors) => {
    return {
        type: STUDENT_INSERT_FAILED,
        payload: {
            errors
        }
    }
}

export const studentUpdateRequested = () => {
    return {
        type: STUDENT_UPDATE_REQUEST
    }
}

export const studentUpdateSuccess = (student) => {
    return {
        type: STUDENT_UPDATE_SUCCESS,
        payload: {
            student
        }
    }
}

export const studentUpdateFailed = (errors) => {
    return {
        type: STUDENT_UPDATE_FAILED,
        payload: {
            errors
        }
    }
}

export const studentDeleteRequested = () => {
    return {
        type: STUDENT_DELETE_REQUEST
    }
}

export const studentDeleteSuccess = (studentId) => {
    return {
        type: STUDENT_DELETE_SUCCESS,
        payload: {
            studentId
        }
    }
}

export const studentDeleteFailed = (errors) => {
    return {
        type: STUDENT_DELETE_FAILED,
        payload: {
            errors
        }
    }
}

export const lecturerLoadRequested = () => {
    return {
        type: LECTURER_LOAD_REQUEST
    }
}

export const lecturerLoadSuccess = (lecturers) => {
    return {
        type: LECTURER_LOAD_SUCCESS,
        payload: {
            lecturers
        }
    }
}

export const lecturerLoadFailed = (errors) => {
    return {
        type: LECTURER_LOAD_FAILED,
        payload: {
            errors
        }
    }
}

export const lecturerInsertRequested = () => {
    return {
        type: LECTURER_INSERT_REQUEST
    }
}

export const lecturerInsertSuccess = (lecturer) => {
    return {
        type: LECTURER_INSERT_SUCCESS,
        payload: {
            lecturer
        }
    }
}

export const lecturerInsertFailed = (errors) => {
    return {
        type: LECTURER_INSERT_FAILED,
        payload: {
            errors
        }
    }
}

export const lecturerUpdateRequested = () => {
    return {
        type: LECTURER_UPDATE_REQUEST
    }
}

export const lecturerUpdateSuccess = (lecturer) => {
    return {
        type: LECTURER_UPDATE_SUCCESS,
        payload: {
            lecturer
        }
    }
}

export const lecturerUpdateFailed = (errors) => {
    return {
        type: LECTURER_UPDATE_FAILED,
        payload: {
            errors
        }
    }
}

export const lecturerDeleteRequested = () => {
    return {
        type: LECTURER_DELETE_REQUEST
    }
}

export const lecturerDeleteSuccess = (lecturerId) => {
    return {
        type: LECTURER_DELETE_SUCCESS,
        payload: {
            lecturerId
        }
    }
}

export const lecturerDeleteFailed = (errors) => {
    return {
        type: LECTURER_DELETE_FAILED,
        payload: {
            errors
        }
    }
}

export const adminLoadRequested = () => {
    return {
        type: ADMIN_LOAD_REQUEST
    }
}

export const adminLoadSuccess = (admins) => {
    return {
        type: ADMIN_LOAD_SUCCESS,
        payload: {
            admins
        }
    }
}

export const adminLoadFailed = (errors) => {
    return {
        type: ADMIN_LOAD_FAILED,
        payload: {
            errors
        }
    }
}