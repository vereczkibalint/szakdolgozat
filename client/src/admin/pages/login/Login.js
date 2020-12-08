import React from 'react';
import './Login.css';

import { useSelector } from 'react-redux';

import LoginForm from '../../components/Forms/LoginForm';
import { Redirect } from 'react-router-dom';

const Login = () => {
    let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(isAuthenticated) {
        return <Redirect to='/admin/dashboard' />;
    }

    return <LoginForm />;
}

export default Login;