import { combineReducers } from 'redux';

import authReducer from '../../common/reducers/authReducer';
import userReducer from "./userReducer";

const adminAppRootReducer = combineReducers({
    auth: authReducer,
    users: userReducer
});

export default adminAppRootReducer;