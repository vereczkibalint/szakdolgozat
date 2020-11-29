import React from 'react';
import './AdminApp.css';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { NotFound } from '../pages/error-pages/index';

import LoginPage from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ManageStudents from './pages/students/ManageStudents';
import ManageLecturers from './pages/lecturers/ManageLecturers';
import ProtectedRoute from '../components/ProtectedRoute';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';

const AdminApp = ({ isAuthenticated }) => {
    const permissions = ['ADMIN'];
    console.log(isAuthenticated);
    // useEffect auth GET request
    return (
        <>
            { isAuthenticated ? <Navbar /> : '' }
            <Switch>
                <Route path="/admin" exact component={LoginPage} />
                <Route path="/admin/login" exact component={LoginPage} />
                <ProtectedRoute 
                        path="/admin/dashboard" 
                        exact 
                        component={Dashboard}
                        permissions={permissions}
                        />
                <ProtectedRoute
                        path="/admin/dashboard/students"
                        exact
                        component={ManageStudents}
                        permissions={permissions}
                        />
                 <ProtectedRoute
                        path="/admin/dashboard/lecturers"
                        exact
                        component={ManageLecturers}
                        permissions={permissions}
                        />       

                <Route component={NotFound} />
            </Switch>
        </>
    )
}

AdminApp.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(AdminApp);
