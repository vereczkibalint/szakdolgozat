import {
    THESIS_THEME_INSERT_REQUEST,
    THESIS_THEME_INSERT_SUCCESS,
    THESIS_THEME_INSERT_FAILED,
    THESIS_THEME_FETCH_REQUEST,
    THESIS_THEME_FETCH_SUCCESS,
    THESIS_THEME_FETCH_FAILED,
    THESIS_THEME_DELETE_REQUEST,
    THESIS_THEME_DELETE_FAILED,
    THESIS_THEME_DELETE_SUCCESS,
    THESIS_THEME_UPDATE_REQUEST,
    THESIS_THEME_UPDATE_SUCCESS, THESIS_THEME_UPDATE_FAILED
} from '../constants/thesesThemesConstants';

const initialState = {
    isLoading: false,
    errors: [],
    themes: []
};

const thesesThemesReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch(type) {
        case THESIS_THEME_INSERT_REQUEST:
        case THESIS_THEME_FETCH_REQUEST:
        case THESIS_THEME_DELETE_REQUEST:
        case THESIS_THEME_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: []
            }
        case THESIS_THEME_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                themes: payload.themes,
                errors: []
            }
        case THESIS_THEME_INSERT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: [],
                themes: [...state.themes, payload.theme]
            }
        case THESIS_THEME_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: [],
                themes: state.themes.map(theme => {
                    if(theme._id === payload.theme._id) {
                        return payload.theme;
                    }

                    return theme;
                })
            }
        case THESIS_THEME_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: [],
                themes: state.themes.filter(theme => theme._id !== payload.theme._id)
            }
        case THESIS_THEME_INSERT_FAILED:
        case THESIS_THEME_FETCH_FAILED:
        case THESIS_THEME_DELETE_FAILED:
        case THESIS_THEME_UPDATE_FAILED:
            return {
                ...state,
                themes: [],
                isLoading: false,
                errors: payload.errors
            }
        default:
            return state;
    }
}

export default thesesThemesReducer;