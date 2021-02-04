import {
    milestoneFetchRequested,
    milestoneFetchSuccess,
    milestoneFetchFailed,
    milestoneInsertRequested,
    milestoneInsertSuccess,
    milestoneInsertFailed,
    milestoneUpdateRequested,
    milestoneUpdateSuccess,
    milestoneUpdateFailed,
    milestoneDeleteRequested,
    milestoneDeleteSuccess,
    milestoneDeleteFailed,
    milestoneStatusChangeRequested,
    milestoneStatusChangeSuccess,
    milestoneStatusChangeFailed,
    milestoneCommentInsertRequested,
    milestoneCommentInsertSuccess,
    milestoneCommentInsertFailed,
    milestoneFetchByIdRequested,
    milestoneFetchByIdSuccess,
    milestoneFetchByIdFailed,
    milestoneCommentDeleteRequested,
    milestoneCommentDeleteSuccess,
    milestoneCommentDeleteFailed,
    milestoneCommentUpdateRequested,
    milestoneCommentUpdateSuccess, milestoneCommentUpdateFailed
} from "../actions/milestoneActions";
import api from "../../utils/api";

const DASHBOARD_URL = "/user/milestones";
const API_ENDPOINT = '/milestones';

export const fetchAllMilestone = (thesisId) => {
    return async (dispatch) => {
        try {
            dispatch(milestoneFetchRequested());
            const { data } = await api.get(`${API_ENDPOINT}/thesis/${thesisId}`);
            dispatch(milestoneFetchSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneFetchFailed(data));
        }
    }
}

export const fetchMilestoneById = (milestoneId) => {
    return async (dispatch) => {
        try {
            dispatch(milestoneFetchByIdRequested());
            const { data } = await api.get(`${API_ENDPOINT}/${milestoneId}`);
            dispatch(milestoneFetchByIdSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneFetchByIdFailed(data));
        }
    }
}

export const insertMilestone = (milestone, history) => {
    return async (dispatch) => {
        try {
            dispatch(milestoneInsertRequested());
            const { data } = await api.post(API_ENDPOINT, milestone);
            dispatch(milestoneInsertSuccess(data));
            history.push(DASHBOARD_URL);
        } catch (error) {
            const { data } = error.response;
            dispatch(milestoneInsertFailed(data));
        }
    }
}

export const updateMilestone = (milestone, history) => {
    return async (dispatch) => {
        try {
            dispatch(milestoneUpdateRequested());
            const { data } = await api.put(`${API_ENDPOINT}/${milestone._id}`, milestone);
            dispatch(milestoneUpdateSuccess(data));
            //history.push(DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneUpdateFailed(data));
        }
    }
}

export const changeMilestoneStatus = (milestoneId, newStatus, history) => {
    return async (dispatch) => {
        try {
            dispatch(milestoneStatusChangeRequested());
            const { data } = await api.post(`${API_ENDPOINT}/status/${milestoneId}`, {status: newStatus});
            dispatch(milestoneStatusChangeSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneStatusChangeFailed(data));
        }
    }
}

export const insertMilestoneComment = (milestoneId, comment) => {
    return async (dispatch) => {
        try {
            dispatch(milestoneCommentInsertRequested());
            let result;
            if(comment.files) {
                let formData = new FormData();
                let { files, ...commentBody } = comment;
                formData.append('files', comment.files);
                formData.append('body', commentBody);
                const { data } = await api.post(`${API_ENDPOINT}/comments/${milestoneId}`, formData);
                result = data;
            } else {
                const { data } = await api.post(`${API_ENDPOINT}/comments/${milestoneId}`, comment);
                result = data;
            }

            dispatch(milestoneCommentInsertSuccess(result));
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneCommentInsertFailed(data));
        }
    }
}

export const updateMilestoneComment = (milestoneId, commentId, updatedComment) => {
    return async (dispatch) => {
        try {
            dispatch(milestoneCommentUpdateRequested());
            const { data } = await api.put(`${API_ENDPOINT}/comments/${milestoneId}/${commentId}`, updatedComment);
            dispatch(milestoneCommentUpdateSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneCommentUpdateFailed(data));
        }
    }
}

export const deleteMilestoneComment = (milestoneId, commentId) => {
    return async (dispatch) => {
        try {
            dispatch(milestoneCommentDeleteRequested());
            const { data } = await api.delete(`${API_ENDPOINT}/comments/${milestoneId}/${commentId}`);
            dispatch(milestoneCommentDeleteSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneCommentDeleteFailed(data));
        }
    }
}

export const deleteMilestone = (milestoneId, history) => {
    return async (dispatch) => {
        try {
            dispatch(milestoneDeleteRequested());
            const { data } = await api.delete(`${API_ENDPOINT}/${milestoneId}`);
            dispatch(milestoneDeleteSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneDeleteFailed(data));
        }
    }
}