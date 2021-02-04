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
    MILESTONE_DELETE_FAILED,
    MILESTONE_STATUS_CHANGE_REQUESTED,
    MILESTONE_STATUS_CHANGE_SUCCESS,
    MILESTONE_STATUS_CHANGE_FAILED,
    MILESTONE_COMMENT_INSERT_REQUESTED,
    MILESTONE_COMMENT_INSERT_SUCCESS,
    MILESTONE_COMMENT_INSERT_FAILED,
    MILESTONE_FETCH_BY_ID_REQUESTED,
    MILESTONE_FETCH_BY_ID_SUCCESS,
    MILESTONE_FETCH_BY_ID_FAILED,
    MILESTONE_COMMENT_DELETE_REQUESTED,
    MILESTONE_COMMENT_DELETE_SUCCESS,
    MILESTONE_COMMENT_DELETE_FAILED,
    MILESTONE_COMMENT_UPDATE_REQUESTED,
    MILESTONE_COMMENT_UPDATE_SUCCESS,
    MILESTONE_COMMENT_UPDATE_FAILED,
    MILESTONE_CLEAR_STATE
} from '../constants/milestoneConstants';

export const milestoneClearState = () => {
    return {
        type: MILESTONE_CLEAR_STATE
    }
}

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

export const milestoneFetchByIdRequested = () => {
    return {
        type: MILESTONE_FETCH_BY_ID_REQUESTED
    }
}

export const milestoneFetchByIdSuccess = (milestone) => {
    return {
        type: MILESTONE_FETCH_BY_ID_SUCCESS,
        payload: {
            milestone
        }
    }
}

export const milestoneFetchByIdFailed = (errors) => {
    return {
        type: MILESTONE_FETCH_BY_ID_FAILED,
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

export const milestoneCommentInsertRequested = () => {
    return {
        type: MILESTONE_COMMENT_INSERT_REQUESTED
    }
}

export const milestoneCommentInsertSuccess = (milestone) => {
    return {
        type: MILESTONE_COMMENT_INSERT_SUCCESS,
        payload: {
            milestone
        }
    }
}

export const milestoneCommentInsertFailed = (errors) => {
    return {
        type: MILESTONE_COMMENT_INSERT_FAILED,
        payload: {
            errors
        }
    }
}

export const milestoneCommentUpdateRequested = () => {
    return {
        type: MILESTONE_COMMENT_UPDATE_REQUESTED
    }
}

export const milestoneCommentUpdateSuccess = (milestone) => {
    return {
        type: MILESTONE_COMMENT_UPDATE_SUCCESS,
        payload: {
            milestone
        }
    }
}

export const milestoneCommentUpdateFailed = (errors) => {
    return {
        type: MILESTONE_COMMENT_UPDATE_FAILED,
        payload: {
            errors
        }
    }
}

export const milestoneCommentDeleteRequested = () => {
    return {
        type: MILESTONE_COMMENT_DELETE_REQUESTED
    }
}

export const milestoneCommentDeleteSuccess = (milestone) => {
    return {
        type: MILESTONE_COMMENT_DELETE_SUCCESS,
        payload: {
            milestone
        }
    }
}

export const milestoneCommentDeleteFailed = (errors) => {
    return {
        type: MILESTONE_COMMENT_DELETE_FAILED,
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

export const milestoneStatusChangeRequested = () => {
    return {
        type: MILESTONE_STATUS_CHANGE_REQUESTED
    }
}

export const milestoneStatusChangeSuccess = (milestone) => {
    return {
        type: MILESTONE_STATUS_CHANGE_SUCCESS,
        payload: {
            milestone
        }
    }
}

export const milestoneStatusChangeFailed = (errors) => {
    return {
        type: MILESTONE_STATUS_CHANGE_FAILED,
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

export const milestoneDeleteSuccess = (milestone) => {
    return {
        type: MILESTONE_DELETE_SUCCESS,
        payload: {
            milestone
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