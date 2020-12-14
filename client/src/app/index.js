import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import UserApp from './UserApp';

const UserSubApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <UserApp />
        </PersistGate>
    </Provider>
);

export default UserSubApp;