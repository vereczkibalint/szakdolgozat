import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk';
import adminAppRootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk];

const persistConfig = {
    key: 'admin',
    storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, adminAppRootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

window.adminStore = store;

const persistor = persistStore(store);
export { store, persistor };