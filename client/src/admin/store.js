import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import adminAppRootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk];

const store = createStore(
    adminAppRootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

window.adminStore = store;

export default store;