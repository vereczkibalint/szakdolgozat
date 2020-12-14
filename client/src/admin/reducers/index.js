import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from "./userReducer";

const adminAppRootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default adminAppRootReducer;