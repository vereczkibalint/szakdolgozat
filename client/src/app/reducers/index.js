import { combineReducers } from 'redux';

import authReducer from '../../common/reducers/authReducer';
import thesesReducer from "./thesesReducer";

const userAppRootReducer = combineReducers({
    auth: authReducer,
    theses: thesesReducer
});

export default userAppRootReducer;