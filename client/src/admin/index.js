import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import AdminApp from './AdminApp';

const AdminSubApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AdminApp />
        </PersistGate>
    </Provider>
);

export default AdminSubApp;