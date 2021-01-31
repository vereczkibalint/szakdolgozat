import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Login.css';
import LoginForm from '../../components/Forms/LoginForm';


const Login = () => {
    let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(isAuthenticated) {
        return <Redirect to='/admin/dashboard/students' />;
    }

    return <LoginForm />;
}

export default Login;