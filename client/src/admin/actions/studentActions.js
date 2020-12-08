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