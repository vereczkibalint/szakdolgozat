import React from 'react';

import { Provider } from 'react-redux';
import store from './store';
import AdminApp from './AdminApp';

const AdminSubApp = () => (
    <Provider store={store}>
        <AdminApp />
    </Provider>
);

export default AdminSubApp;