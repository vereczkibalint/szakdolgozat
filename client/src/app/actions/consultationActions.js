import {
    CONSULTATION_FETCH_REQUEST,
    CONSULTATION_FETCH_SUCCESS,
    CONSULTATION_FETCH_FAILED,
    CONSULTATION_RESERVE_REQUEST,
    CONSULTATION_RESERVE_SUCCESS,
    CONSULTATION_RESERVE_FAILED,
    CONSULTATION_CANCEL_REQUEST,
    CONSULTATION_CANCEL_SUCCESS,
    CONSULTATION_CANCEL_FAILED,
    CONSULTATION_INSERT_REQUEST,
    CONSULTATION_INSERT_SUCCESS,
    CONSULTATION_INSERT_FAILED,
    CONSULTATION_UPDATE_REQUEST,
    CONSULTATION_UPDATE_SUCCESS,
    CONSULTATION_UPDATE_FAILED,
    CONSULTATION_DELETE_REQUEST,
    CONSULTATION_DELETE_SUCCESS,
    CONSULTATION_DELETE_FAILED,
    CONSULTATION_FETCH_BY_ID_REQUESTED,
    CONSULTATION_FETCH_BY_ID_SUCCESS,
    CONSULTATION_FETCH_BY_ID_FAILED
} from '../constants/consultationConstants';

export const consultationFetchRequested = () => {
    return {
        type: CONSULTATION_FETCH_REQUEST
    }
}

export const consultationFetchSuccess = (consultations) => {
    return {
        type: CONSULTATION_FETCH_SUCCESS,
        payload: {
            consultations
        }
    }
}

export const consultationFetchFailed = (errors) => {
    return {
        type: CONSULTATION_FETCH_FAILED,
        payload: {
            errors
        }
    }
}

export const consultationFetchByIdRequested = () => {
    return {
        type: CONSULTATION_FETCH_BY_ID_REQUESTED
    }
}

export const consultationFetchByIdSuccess = (consultation) => {
    return {
        type: CONSULTATION_FETCH_BY_ID_SUCCESS,
        payload: {
            consultation
        }
    }
}

export const consultationFetchByIdFailed = (errors) => {
    return {
        type: CONSULTATION_FETCH_BY_ID_FAILED,
        payload: {
            errors
        }
    }
}

export const consultationReserveRequested = () => {
    return {
        type: CONSULTATION_RESERVE_REQUEST
    }
}

export const consultationReserveSuccess = (consultation) => {
    return {
        type: CONSULTATION_RESERVE_SUCCESS,
        payload: {
            consultation
        }
    }
}

export const consultationReserveFailed = (errors) => {
    return {
        type: CONSULTATION_RESERVE_FAILED,
        payload: {
            errors
        }
    }
}

export const consultationCancelRequested = () => {
    return {
        type: CONSULTATION_CANCEL_REQUEST
    }
}

export const consultationCancelSuccess = (consultation) => {
    return {
        type: CONSULTATION_CANCEL_SUCCESS,
        payload: {
            consultation
        }
    }
}

export const consultationCancelFailed = (errors) => {
    return {
        type: CONSULTATION_CANCEL_FAILED,
        payload: {
            errors
        }
    }
}

export const consultationInsertRequested = () => {
    return {
        type: CONSULTATION_INSERT_REQUEST
    }
}

export const consultationInsertSuccess = (consultation) => {
    return {
        type: CONSULTATION_INSERT_SUCCESS,
        payload: {
            consultation
        }
    }
}

export const consultationInsertFailed = (errors) => {
    return {
        type: CONSULTATION_INSERT_FAILED,
        payload: {
            errors
        }
    }
}

export const consultationUpdateRequested = () => {
    return {
        type: CONSULTATION_UPDATE_REQUEST
    }
}

export const consultationUpdateSuccess = (consultation) => {
    return {
        type: CONSULTATION_UPDATE_SUCCESS,
        payload: {
            consultation
        }
    }
}

export const consultationUpdateFailed = (errors) => {
    return {
        type: CONSULTATION_UPDATE_FAILED,
        payload: {
            errors
        }
    }
}

export const consultationDeleteRequested = () => {
    return {
        type: CONSULTATION_DELETE_REQUEST
    }
}

export const consultationDeleteSuccess = (consultation) => {
    return {
        type: CONSULTATION_DELETE_SUCCESS,
        payload: {
            consultation
        }
    }
}

export const consultationDeleteFailed = (errors) => {
    return {
        type: CONSULTATION_DELETE_FAILED,
        payload: {
            errors
        }
    }
}