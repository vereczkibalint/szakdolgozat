import React from 'react';

import { Provider } from 'react-redux';
import store from './store';
import UserApp from './UserApp';

const UserSubApp = () => (
    <UserApp />
);

export default UserSubApp;