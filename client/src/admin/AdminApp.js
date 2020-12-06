import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import './AdminApp.css';

import { NotFound } from '../pages/error-pages/index';
import LoginPage from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ManageStudents from './pages/students/ManageStudents';
import ManageLecturers from './pages/lecturers/ManageLecturers';
import Navbar from './components/Navbar';
import store from './store';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminApp = ({ isAuthenticated }) => {
    return (
        <>
            { isAuthenticated ? <Navbar /> : '' }
            <Switch>
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
                        path="/admin/dashboard/lecturers"
                        exact
                        component={ManageLecturers}
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
