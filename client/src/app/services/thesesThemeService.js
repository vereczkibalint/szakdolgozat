import api from '../../utils/api';

import {
    thesesThemeInsertRequested,
    thesesThemeInsertSuccess,
    thesesThemeInsertFailed,
    thesesThemeFetchRequested,
    thesesThemeFetchSuccess,
    thesesThemeFetchFailed,
    thesesThemeDeleteRequested,
    thesesThemeDeleteSuccess,
    thesesThemeDeleteFailed,
    thesesThemeUpdateRequested,
    thesesThemeUpdateSuccess,
    thesesThemeUpdateFailed,
    thesisThemeImportRequested,
    thesisThemeImportSuccess,
    thesisThemeImportFailed
} from '../actions/thesesThemesActions';

const API_ENDPOINT = '/theses/themes';

export const fetchThesisThemes = () => {
    return async (dispatch) => {
        try {
            dispatch(thesesThemeFetchRequested());
            const { data } = await api.get(API_ENDPOINT);
            dispatch(thesesThemeFetchSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(thesesThemeFetchFailed(data));
        }
    }
}

export const importThesisTheme = (importFile) => {
    return async (dispatch) => {
        try {
            let formData = new FormData();
            formData.append('import', importFile);
            dispatch(thesisThemeImportRequested());
            const { data } = await api.post(`${API_ENDPOINT}/import`, formData);
            dispatch(thesisThemeImportSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(thesisThemeImportFailed(data));
        }
    }
}

export const insertThesisTheme = (theme) => {
    return async (dispatch) => {
        try {
            dispatch(thesesThemeInsertRequested());
            const { data } = await api.post(API_ENDPOINT, theme);
            dispatch(thesesThemeInsertSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(thesesThemeInsertFailed(data));
        }
    }
}

export const updateThesisTheme = (updatedTheme) => {
    return async (dispatch) => {
        try {
            dispatch(thesesThemeUpdateRequested());
            const { data } = await api.put(`${API_ENDPOINT}/${updatedTheme._id}`, updatedTheme);
            dispatch(thesesThemeUpdateSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(thesesThemeUpdateFailed(data));
        }
    }
}

export const deleteThesisTheme = (themeId) => {
    return async (dispatch) => {
        try {
            dispatch(thesesThemeDeleteRequested());
            const { data } = await api.delete(`${API_ENDPOINT}/${themeId}`);
            dispatch(thesesThemeDeleteSuccess(data));
        } catch(error) {
            const { data } = error.response;
            dispatch(thesesThemeDeleteFailed(data));
        }
    }
}
