import {
    THESIS_THEME_INSERT_REQUEST,
    THESIS_THEME_INSERT_SUCCESS,
    THESIS_THEME_INSERT_FAILED,
    THESIS_THEME_FETCH_REQUEST,
    THESIS_THEME_FETCH_SUCCESS,
    THESIS_THEME_FETCH_FAILED,
    THESIS_THEME_DELETE_REQUEST,
    THESIS_THEME_DELETE_SUCCESS,
    THESIS_THEME_DELETE_FAILED,
    THESIS_THEME_UPDATE_REQUEST,
    THESIS_THEME_UPDATE_SUCCESS, THESIS_THEME_UPDATE_FAILED
} from '../constants/thesesThemesConstants';

export const thesesThemeFetchRequested = () => {
    return {
        type: THESIS_THEME_FETCH_REQUEST
    }
}

export const thesesThemeFetchSuccess = (themes) => {
    return {
        type: THESIS_THEME_FETCH_SUCCESS,
        payload: {
            themes
        }
    }
}

export const thesesThemeFetchFailed = (errors) => {
    return {
        type: THESIS_THEME_FETCH_FAILED,
        payload: {
            errors
        }
    }
}

export const thesesThemeInsertRequested = () => {
    return {
        type: THESIS_THEME_INSERT_REQUEST
    }
}

export const thesesThemeInsertSuccess = (theme) => {
    return {
        type: THESIS_THEME_INSERT_SUCCESS,
        payload: {
            theme
        }
    }
}

export const thesesThemeInsertFailed = (errors) => {
    return {
        type: THESIS_THEME_INSERT_FAILED,
        payload: {
            errors
        }
    }
}

export const thesesThemeUpdateRequested = () => {
    return {
        type: THESIS_THEME_UPDATE_REQUEST
    }
}

export const thesesThemeUpdateSuccess = (theme) => {
    return {
        type: THESIS_THEME_UPDATE_SUCCESS,
        payload: {
            theme
        }
    }
}

export const thesesThemeUpdateFailed = (errors) => {
    return {
        type: THESIS_THEME_UPDATE_FAILED,
        payload: {
            errors
        }
    }
}

export const thesesThemeDeleteRequested = () => {
    return {
        type: THESIS_THEME_DELETE_REQUEST
    }
}

export const thesesThemeDeleteSuccess = (theme) => {
    return {
        type: THESIS_THEME_DELETE_SUCCESS,
        payload: {
            theme
        }
    }
}

export const thesesThemeDeleteFailed = (errors) => {
    return {
        type: THESIS_THEME_DELETE_FAILED,
        payload: {
            errors
        }
    }
}