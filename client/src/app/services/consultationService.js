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
    consultationCancelFailed
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

/*export const fetchConsultationById = (consultationId) => {
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
}*/

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
            //history.push(DASHBOARD_URL);
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
            console.log(data);
            dispatch(consultationDeleteSuccess(data));
            history.push(DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(consultationDeleteFailed(data));
        }
    }
}