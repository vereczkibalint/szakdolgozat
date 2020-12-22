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
    milestoneDeleteFailed
} from "../actions/milestoneActions";
import api from "../../utils/api";

const DASHBOARD_URL = "/user/milestones";
const API_ENDPOINT = '/milestones';

export const fetchAllMilestone = () => {
    return async (dispatch) => {
        try {
            dispatch(milestoneFetchRequested());
            const { data } = await api.get(API_ENDPOINT);
            dispatch(milestoneFetchSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneFetchFailed(data));
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
            history.push(DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(milestoneUpdateFailed(data));
        }
    }
}

export const deleteMilestone = (milestoneId) => {
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