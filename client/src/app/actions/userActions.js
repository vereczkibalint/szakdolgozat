import {
    STUDENT_FETCH_REQUESTED,
    STUDENT_FETCH_SUCCESS,
    STUDENT_FETCH_FAILED
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