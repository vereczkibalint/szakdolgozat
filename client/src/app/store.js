import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import userAppRootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk];

const persistConfig = {
    key: 'user',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userAppRootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

window.userStore = store;

const persistor = persistStore(store);
export { store, persistor };