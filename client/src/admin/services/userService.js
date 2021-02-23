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
    studentDeleteFailed,
    lecturerLoadRequested,
    lecturerLoadSuccess,
    lecturerLoadFailed,
    lecturerInsertRequested,
    lecturerInsertSuccess,
    lecturerInsertFailed,
    lecturerUpdateRequested,
    lecturerUpdateSuccess,
    lecturerUpdateFailed,
    lecturerDeleteRequested,
    lecturerDeleteSuccess,
    lecturerDeleteFailed,
    userImportRequested,
    userImportSuccess,
    userImportFailed,
    adminLoadRequested,
    adminLoadSuccess,
    adminLoadFailed
} from '../actions/userActions';

const STUDENTS_DASHBOARD_URL = "/admin/dashboard/students";
const LECTURERS_DASHBOARD_URL = "/admin/dashboard/lecturers";
const API_ENDPOINT = '/users';

export const fetchAllStudent = () => {
    return async (dispatch) => {
        dispatch(studentLoadRequested());
        try{
            const { data } = await api.get(`${API_ENDPOINT}/role/student`);
            dispatch(studentLoadSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(studentLoadFailed(data));
        }
    }
}

export const importUsers = (importFile, userType) => {
    return async (dispatch) => {
        try {
            dispatch(userImportRequested());
            let formData = new FormData();
            formData.append('import', importFile);
            const { data } = await api.post(`${API_ENDPOINT}/${userType.toLowerCase()}/import`, formData);
            dispatch(userImportSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(userImportFailed(data));
        }
    }
}

export const insertStudent = (student, history) => {
    return async (dispatch) => {
        try{
            dispatch(studentInsertRequested());
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
        try {
            dispatch(studentUpdateRequested());
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
        try {
            dispatch(studentDeleteRequested());
            const { data } = await api.delete(`${API_ENDPOINT}/${studentId}`);
            dispatch(studentDeleteSuccess(data._id));
        } catch(error) {
            const { data } = error.response;
            dispatch(studentDeleteFailed(data));
        }
    }
}

export const fetchAllLecturer = () => {
    return async (dispatch) => {
        try{
            dispatch(lecturerLoadRequested());
            const { data } = await api.get(`${API_ENDPOINT}/role/lecturer`);
            dispatch(lecturerLoadSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(lecturerLoadFailed(data));
        }
    }
}

export const insertLecturer = (lecturer, history) => {
    return async (dispatch) => {
        try{
            dispatch(lecturerInsertRequested());
            const { data } = await api.post(`${API_ENDPOINT}`, lecturer);
            dispatch(lecturerInsertSuccess(data));
            history.push(LECTURERS_DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(lecturerInsertFailed(data));
        }
    }
}

export const updateLecturer = (lecturer, history) => {
    return async (dispatch) => {
        try {
            dispatch(lecturerUpdateRequested());
            const { data } = await api.put(`${API_ENDPOINT}/${lecturer._id}`, lecturer);
            dispatch(lecturerUpdateSuccess(data));
            history.push(LECTURERS_DASHBOARD_URL);
        } catch(error) {
            const { data } = error.response;
            dispatch(lecturerUpdateFailed(data));
        }
    }
}

export const deleteLecturer = (lecturerId) => {
    return async (dispatch) => {
        try {
            dispatch(lecturerDeleteRequested());
            const { data } = await api.delete(`${API_ENDPOINT}/${lecturerId}`);
            dispatch(lecturerDeleteSuccess(data._id));
        } catch(error) {
            const { data } = error.response;
            dispatch(lecturerDeleteFailed(data));
        }
    }
}

export const fetchAllAdmin = () => {
    return async (dispatch) => {
        try{
            dispatch(adminLoadRequested());
            const { data } = await api.get(`${API_ENDPOINT}/role/admin`);
            dispatch(adminLoadSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(adminLoadFailed(data));
        }
    }
}