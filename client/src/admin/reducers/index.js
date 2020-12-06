import { combineReducers } from 'redux';

import authReducer from './authReducer';
import studentReducer from './studentReducer';

const adminAppRootReducer = combineReducers({
    auth: authReducer,
    student: studentReducer
});

export default adminAppRootReducer;