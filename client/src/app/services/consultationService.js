import {
    consultationFetchRequested,
    consultationFetchSuccess,
    consultationFetchFailed,
    consultationInsertRequested,
    consultationInsertSuccess,
    consultationInsertFailed,
    consultationUpdateRequested,
    consultationUpdateSuccess,
    consultationUpdateFailed,
    consultationDeleteRequested,
    consultationDeleteSuccess,
    consultationDeleteFailed,
    consultationReserveRequested,
    consultationReserveSuccess,
    consultationReserveFailed,
    consultationCancelRequested,
    consultationCancelSuccess,
    consultationCancelFailed,
    consultationFetchByIdRequested,
    consultationFetchByIdSuccess,
    consultationFetchByIdFailed
} from '../actions/consultationActions';
import api from "../../utils/api";

const DASHBOARD_URL = "/user/consultations";
const API_ENDPOINT = '/consultations';

export const fetchAllConsultation = () => {
    return async (dispatch) => {
        try {
            dispatch(consultationFetchRequested());
            const { data } = await api.get(API_ENDPOINT);
            dispatch(consultationFetchSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(consultationFetchFailed(data));
        }
    }
}

export const consultationFetchById = (consultationId) => {
    return async (dispatch) => {
        try {
            dispatch(consultationFetchByIdRequested());
            const { data } = await api.get(`${API_ENDPOINT}/${consultationId}`);
            dispatch(consultationFetchByIdSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(consultationFetchByIdFailed(data));
        }
    }
}

export const createConsultation = (consultation, history) => {
    return async (dispatch) => {
        try {
            dispatch(consultationInsertRequested());
            const { data } = await api.post(API_ENDPOINT, consultation);
            dispatch(consultationInsertSuccess(data));
            history.push(DASHBOARD_URL);
        } catch (error) {
            const { data } = error.response;
            dispatch(consultationInsertFailed(data));
        }
    }
}

export const updateConsultation = (consultation, history) => {
    return async (dispatch) => {
        try {
            dispatch(consultationUpdateRequested());
            const { data } = await api.put(`${API_ENDPOINT}/${consultation._id}`, consultation);
            dispatch(consultationUpdateSuccess(data));
            history.push(DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(consultationUpdateFailed(data));
        }
    }
}

export const deleteConsultation = (consultationId, history) => {
    return async (dispatch) => {
        try {
            dispatch(consultationDeleteRequested());
            const { data } = await api.delete(`${API_ENDPOINT}/${consultationId}`);
            dispatch(consultationDeleteSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(consultationDeleteFailed(data));
        }
    }
}

export const reserveConsultation = (consultationId) => {
    return async (dispatch) => {
        try {
            dispatch(consultationReserveRequested());
            const { data } = await api.post(`${API_ENDPOINT}/reserve/${consultationId}`);
            dispatch(consultationReserveSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(consultationReserveFailed(data));
        }
    }
}

export const cancelReservation = (reservationId) => {
    return async (dispatch) => {
        try {
            dispatch(consultationCancelRequested());
            const { data } = await api.post(`${API_ENDPOINT}/cancel/${reservationId}`);
            dispatch(consultationCancelSuccess(data));
        } catch(error) {
           const { data } = error.response;
            dispatch(consultationCancelFailed(data));
        }
    }
}