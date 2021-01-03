import {
    MILESTONE_FETCH_REQUEST,
    MILESTONE_FETCH_SUCCESS,
    MILESTONE_FETCH_FAILED,
    MILESTONE_INSERT_REQUEST,
    MILESTONE_INSERT_SUCCESS,
    MILESTONE_INSERT_FAILED,
    MILESTONE_UPDATE_REQUEST,
    MILESTONE_UPDATE_SUCCESS,
    MILESTONE_UPDATE_FAILED,
    MILESTONE_DELETE_REQUEST,
    MILESTONE_DELETE_SUCCESS,
    MILESTONE_DELETE_FAILED
} from '../constants/milestoneConstants';

export const milestoneFetchRequested = () => {
    return {
        type: MILESTONE_FETCH_REQUEST
    }
}

export const milestoneFetchSuccess = (milestones) => {
    return {
        type: MILESTONE_FETCH_SUCCESS,
        payload: {
            milestones
        }
    }
}

export const milestoneFetchFailed = (errors) => {
    return {
        type: MILESTONE_FETCH_FAILED,
        payload: {
            errors
        }
    }
}

export const milestoneInsertRequested = () => {
    return {
        type: MILESTONE_INSERT_REQUEST
    }
}

export const milestoneInsertSuccess = (milestone) => {
    return {
        type: MILESTONE_INSERT_SUCCESS,
        payload: {
            milestone
        }
    }
}

export const milestoneInsertFailed = (errors) => {
    return {
        type: MILESTONE_INSERT_FAILED,
        payload: {
            errors
        }
    }
}

export const milestoneUpdateRequested = () => {
    return {
        type: MILESTONE_UPDATE_REQUEST
    }
}

export const milestoneUpdateSuccess = (milestone) => {
    return {
        type: MILESTONE_UPDATE_SUCCESS,
        payload: {
            milestone
        }
    }
}

export const milestoneUpdateFailed = (errors) => {
    return {
        type: MILESTONE_UPDATE_FAILED,
        payload: {
            errors
        }
    }
}

export const milestoneDeleteRequested = () => {
    return {
        type: MILESTONE_DELETE_REQUEST
    }
}

export const milestoneDeleteSuccess = (milestoneId) => {
    return {
        type: MILESTONE_DELETE_SUCCESS,
        payload: {
            milestoneId
        }
    }
}

export const milestoneDeleteFailed = (errors) => {
    return {
        type: MILESTONE_DELETE_FAILED,
        payload: {
            errors
        }
    }
}