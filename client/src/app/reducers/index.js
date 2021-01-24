import { combineReducers } from 'redux';

import authReducer from '../../common/reducers/authReducer';
import thesesReducer from "./thesesReducer";
import userReducer from "./userReducer";
import milestoneReducer from "./milestoneReducer";
import consultationReducer from "./consultationReducer";

const rootReducer = (state, action) => {
    if(action.type === 'AUTH_LOGOUT') {
        state = {}
    }
    return userAppRootReducer(state, action);
}

const userAppRootReducer = combineReducers({
    auth: authReducer,
    theses: thesesReducer,
    users: userReducer,
    milestones: milestoneReducer,
    consultations: consultationReducer
});

export default rootReducer;