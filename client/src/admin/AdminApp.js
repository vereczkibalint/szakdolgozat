import React from 'react';
import {useSelector} from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './AdminApp.css';

import { NotFound } from '../pages/error-pages/index';
import LoginPage from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ManageStudents from './pages/students/ManageStudents';
import ManageLecturers from './pages/lecturers/ManageLecturers';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from './components/Navbar';
import CreateUser from "./pages/users/CreateUser";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import api from "../utils/api";

const AdminApp = () => {
    let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    let token = useSelector(state => state.auth.token);

    if(isAuthenticated) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    return (
        <>
            { isAuthenticated ? <Navbar /> : '' }
            <div className="container">
                <Switch>
                    <Route path="/admin" exact component={LoginPage} />
                    <Route path="/admin/login" exact component={LoginPage} />
                    <ProtectedRoute
                            path="/admin/dashboard" 
                            exact 
                            component={Dashboard}
                            />
                    <ProtectedRoute
                            path="/admin/dashboard/students"
                            exact
                            component={ManageStudents}
                            />

                    <ProtectedRoute
                        path="/admin/dashboard/students/create"
                        exact
                        component={CreateUser}
                    />

                    <ProtectedRoute
                        path="/admin/dashboard/students/:id"
                        exact
                        component={UserDetailsPage}
                    />

                    <ProtectedRoute
                            path="/admin/dashboard/lecturers"
                            exact
                            component={ManageLecturers}
                            />

                    <Route component={NotFound} />
                </Switch>
            </div>
        </>
    )
}

export default AdminApp;
