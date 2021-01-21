import React from 'react';
import { Redirect } from "react-router-dom";
import LoginForm from "../../components/Forms/LoginForm";
import {useSelector} from "react-redux";


const Login = () => {
    let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(isAuthenticated) {
        return <Redirect to='/user/theses' />;
    }

    return <LoginForm />;
}


export default Login;
