import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk];

const persistConfig = {
    key: 'user',
    storage: storageSession,
    whitelist: ['auth', 'milestones', 'consultations', 'theses']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

window.userStore = store;

const persistor = persistStore(store);
export { store, persistor };