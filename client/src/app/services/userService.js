import api from "../../utils/api";

import {
    studentFetchRequested,
    studentFetchSuccess,
    studentFetchFailed
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
