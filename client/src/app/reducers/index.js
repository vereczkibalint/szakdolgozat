import { combineReducers } from 'redux';

import authReducer from '../../common/reducers/authReducer';
import thesesReducer from "./thesesReducer";
import userReducer from "./userReducer";
import milestoneReducer from "./milestoneReducer";

const userAppRootReducer = combineReducers({
    auth: authReducer,
    theses: thesesReducer,
    users: userReducer,
    milestones: milestoneReducer
});

export default userAppRootReducer;