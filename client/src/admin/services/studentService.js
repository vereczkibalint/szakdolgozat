import api from '../../utils/api';

import { 
    studentLoadRequested,
    studentLoadSuccess,
    studentLoadFailed,
    studentInsertRequested,
    studentInsertSuccess,
    studentInsertFailed,
    studentUpdateRequested,
    studentUpdateSuccess,
    studentUpdateFailed,
    studentDeleteRequested,
    studentDeleteSuccess,
    studentDeleteFailed
} from '../actions/studentActions';

const STUDENTS_DASHBOARD_URL = "/admin/dashboard/students";
const API_ENDPOINT = '/users';

export const fetchAllStudent = () => {
    return async (dispatch) => {
        dispatch(studentLoadRequested());
        try{
            const { data } = await api.get(`${API_ENDPOINT}/student`);
            dispatch(studentLoadSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(studentLoadFailed(data));
        }
    }
}

export const insertStudent = (student, history) => {
    return async (dispatch) => {
        dispatch(studentInsertRequested());
        try{
            const { data } = await api.post(`${API_ENDPOINT}`, student);
            dispatch(studentInsertSuccess(data));
            history.push(STUDENTS_DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(studentInsertFailed(data));
        }
    }
}

export const updateStudent = (student, history) => {
    return async (dispatch) => {
        dispatch(studentUpdateRequested());
        try {
            const { data } = await api.put(`${API_ENDPOINT}/${student._id}`, student);
            dispatch(studentUpdateSuccess(data));
            history.push(STUDENTS_DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(studentUpdateFailed(data));
        }
    }
}

export const deleteStudent = (studentId) => {
    return async (dispatch) => {
        dispatch(studentDeleteRequested());
        try {
            const { data } = await api.delete(`${API_ENDPOINT}/${studentId}`);
            dispatch(studentDeleteSuccess(data._id));
        } catch(error) {
            const { data } = error.response;
            dispatch(studentDeleteFailed(data));
        }
    }
}