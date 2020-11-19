import { combineReducers } from 'redux';

import authReducer from './authReducer';

const adminAppRootReducer = combineReducers({
    auth: authReducer
});

export default adminAppRootReducer;