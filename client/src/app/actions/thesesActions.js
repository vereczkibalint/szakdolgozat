import {
    THESES_FETCH_REQUEST,
    THESES_FETCH_SUCCESS,
    THESES_FETCH_FAILED,
    THESIS_INSERT_REQUEST,
    THESIS_INSERT_SUCCESS,
    THESIS_INSERT_FAILED,
    THESIS_UPDATE_REQUEST,
    THESIS_UPDATE_SUCCESS,
    THESIS_UPDATE_FAILED,
    THESIS_DELETE_REQUEST,
    THESIS_DELETE_SUCCESS,
    THESIS_DELETE_FAILED,
    THESES_FETCH_BY_STUDENT_REQUEST,
    THESES_FETCH_BY_STUDENT_SUCCESS,
    THESES_FETCH_BY_STUDENT_FAILED, THESIS_FETCH_BY_ID_REQUESTED, THESIS_FETCH_BY_ID_SUCCESS, THESIS_FETCH_BY_ID_FAILED
} from '../constants/thesesConstants';

export const thesesFetchRequested = () => {
    return {
        type: THESES_FETCH_REQUEST
    }
}

export const thesesFetchSuccess = (theses) => {
    return {
        type: THESES_FETCH_SUCCESS,
        payload: {
            theses
        }
    }
}

export const thesesFetchFailed = (errors) => {
    return {
        type: THESES_FETCH_FAILED,
        payload: {
            errors
        }
    }
}

export const thesisFetchByIdRequested = () => {
    return {
        type: THESIS_FETCH_BY_ID_REQUESTED
    }
}

export const thesisFetchByIdSuccess = (thesis) => {
    return {
        type: THESIS_FETCH_BY_ID_SUCCESS,
        payload: {
            thesis
        }
    }
}

export const thesisFetchByIdFailed = (errors) => {
    return {
        type: THESIS_FETCH_BY_ID_FAILED,
        payload: {
            errors
        }
    }
}

export const thesisFetchByStudentRequested = () => {
    return {
        type: THESES_FETCH_BY_STUDENT_REQUEST
    }
}

export const thesisFetchByStudentSuccess = (thesis) => {
    return {
        type: THESES_FETCH_BY_STUDENT_SUCCESS,
        payload: {
            thesis
        }
    }
}

export const thesisFetchByStudentFailed = (errors) => {
    return {
        type: THESES_FETCH_BY_STUDENT_FAILED,
        payload: {
            errors
        }
    }
}

export const thesisInsertRequested = () => {
    return {
        type: THESIS_INSERT_REQUEST
    }
}

export const thesisInsertSuccess = (thesis) => {
    return {
        type: THESIS_INSERT_SUCCESS,
        payload: {
            thesis
        }
    }
}

export const thesisInsertFailed = (errors) => {
    return {
        type: THESIS_INSERT_FAILED,
        payload: {
            errors
        }
    }
}

export const thesisUpdateRequested = () => {
    return {
        type: THESIS_UPDATE_REQUEST
    }
}

export const thesisUpdateSuccess = (thesis) => {
    return {
        type: THESIS_UPDATE_SUCCESS,
        payload: {
            thesis
        }
    }
}

export const thesisUpdateFailed = (errors) => {
    return {
        type: THESIS_UPDATE_FAILED,
        payload: {
            errors
        }
    }
}

export const thesisDeleteRequested = () => {
    return {
        type: THESIS_DELETE_REQUEST
    }
}

export const thesisDeleteSuccess = (thesisId) => {
    return {
        type: THESIS_DELETE_SUCCESS,
        payload: {
            thesisId
        }
    }
}

export const thesisDeleteFailed = (errors) => {
    return {
        type: THESIS_DELETE_FAILED,
        payload: {
            errors
        }
    }
}