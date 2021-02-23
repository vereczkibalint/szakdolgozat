import api from "../../utils/api";

import {
    studentFetchRequested,
    studentFetchSuccess,
    studentFetchFailed,
    studentImportRequested,
    studentImportSuccess,
    studentImportFailed,
    studentDeleteFailed,
    studentDeleteSuccess, studentDeleteRequested
} from "../actions/userActions";

const API_ENDPOINT = '/users';

export const fetchAllStudent = () => {
    return async (dispatch) => {
        try {
            dispatch(studentFetchRequested());
            const { data } = await api.get(`${API_ENDPOINT}/role/student`);
            dispatch(studentFetchSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(studentFetchFailed(data));
        }
    }
}

export const importStudents = (importFile) => {
    return async (dispatch) => {
        try {
            dispatch(studentImportRequested());
            let formData = new FormData();
            formData.append('import', importFile);
            const { data } = await api.post(`${API_ENDPOINT}/student/import`, formData);
            dispatch(studentImportSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(studentImportFailed(data));
        }
    }
}

export const deleteStudent = (studentId) => {
    return async (dispatch) => {
        try {
            dispatch(studentDeleteRequested());
            const { data } = await api.delete(`${API_ENDPOINT}/student/${studentId}`);
            dispatch(studentDeleteSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(studentDeleteFailed(data));
        }
    }
}
