import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NotFound } from '../pages/error-pages/index';

import LoginPage from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminApp = () => {
    const user = localStorage.getItem('user');
    const permissions = ['ADMIN'];
    return (
        <div>
            <Switch>
                <Route path="/admin/login" exact component={LoginPage} />
                <ProtectedRoute 
                        path="/admin/dashboard" 
                        exact 
                        component={Dashboard}
                        permissions={permissions}
                        user={user} />

                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default AdminApp;
