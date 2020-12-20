import { combineReducers } from 'redux';

import authReducer from '../../common/reducers/authReducer';
import thesesReducer from "./thesesReducer";
import userReducer from "./userReducer";

const userAppRootReducer = combineReducers({
    auth: authReducer,
    theses: thesesReducer,
    users: userReducer
});

export default userAppRootReducer;