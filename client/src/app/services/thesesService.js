import api from '../../utils/api';

import {
    thesesFetchRequested,
    thesesFetchSuccess,
    thesesFetchFailed,
    thesisInsertRequested,
    thesisInsertSuccess,
    thesisInsertFailed,
    thesisUpdateRequested,
    thesisUpdateSuccess,
    thesisUpdateFailed,
    thesisDeleteRequested,
    thesisDeleteSuccess,
    thesisDeleteFailed,
    thesisFetchByStudentRequested,
    thesisFetchByStudentSuccess,
    thesisFetchByStudentFailed,
    thesisFetchByIdRequested, thesisFetchByIdSuccess, thesisFetchByIdFailed
} from '../actions/thesesActions';

const DASHBOARD_URL = "/user/theses";
const API_ENDPOINT = '/theses';

export const fetchAllTheses = () => {
    return async (dispatch) => {
        try {
            dispatch(thesesFetchRequested());
            const { data } = await api.get(API_ENDPOINT);
            dispatch(thesesFetchSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(thesesFetchFailed(data));
        }
    }
}

export const fetchThesisById = (thesisId) => {
    return async (dispatch) => {
        try {
            dispatch(thesisFetchByIdRequested());
            const { data } = await api.get(`${API_ENDPOINT}/${thesisId}`);
            dispatch(thesisFetchByIdSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(thesisFetchByIdFailed(data));
        }
    }
}

export const fetchThesisByStudent = () => {
    return async (dispatch) => {
        try {
            dispatch(thesisFetchByStudentRequested());
            const { data } = await api.get(`${API_ENDPOINT}/student`);
            dispatch(thesisFetchByStudentSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(thesisFetchByStudentFailed(data));
        }
    }
}

export const insertThesis = (thesis, history) => {
    return async (dispatch) => {
        try {
            dispatch(thesisInsertRequested());
            const { data } = await api.post(API_ENDPOINT, thesis);
            dispatch(thesisInsertSuccess(data));
            history.push(DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(thesisInsertFailed(data));
        }
    }
}

export const updateThesis = (thesis, history) => {
    return async (dispatch) => {
        try {
            dispatch(thesisUpdateRequested());
            const { data } = await api.put(`${API_ENDPOINT}/${thesis._id}`, thesis);
            dispatch(thesisUpdateSuccess(data));
            history.push(DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(thesisUpdateFailed(data));
        }
    }
}

export const deleteThesis = (thesisId) => {
    return async (dispatch) => {
        try {
            dispatch(thesisDeleteRequested());
            const { data } = await api.delete(`${API_ENDPOINT}/${thesisId}`);
            dispatch(thesisDeleteSuccess(data._id));
        } catch(error) {
            const { data } = error.response;
            dispatch(thesisDeleteFailed(data));
        }
    }
}