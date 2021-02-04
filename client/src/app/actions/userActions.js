import {
    STUDENT_FETCH_REQUESTED,
    STUDENT_FETCH_SUCCESS,
    STUDENT_FETCH_FAILED,
    STUDENT_IMPORT_REQUESTED,
    STUDENT_IMPORT_SUCCESS,
    STUDENT_IMPORT_FAILED,
    STUDENT_DELETE_REQUESTED,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_FAILED
} from "../constants/userConstants";

export const studentFetchRequested = () => {
    return {
        type: STUDENT_FETCH_REQUESTED
    }
}

export const studentFetchSuccess = (students) => {
    return {
        type: STUDENT_FETCH_SUCCESS,
        payload: {
            students
        }
    }
}

export const studentFetchFailed = (errors) => {
    return {
        type: STUDENT_FETCH_FAILED,
        payload: {
            errors
        }
    }
}

export const studentImportRequested = () => {
    return {
        type: STUDENT_IMPORT_REQUESTED
    }
}

export const studentImportSuccess = (students) => {
    return {
        type: STUDENT_IMPORT_SUCCESS,
        payload: {
            students
        }
    }
}

export const studentImportFailed = (errors) => {
    return {
        type: STUDENT_IMPORT_FAILED,
        payload: {
            errors
        }
    }
}

export const studentDeleteRequested = () => {
    return {
        type: STUDENT_DELETE_REQUESTED
    }
}

export const studentDeleteSuccess = (student) => {
    return {
        type: STUDENT_DELETE_SUCCESS,
        payload: {
            student
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