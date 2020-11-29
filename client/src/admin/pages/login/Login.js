import React from 'react';
import './Login.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm';
import { Redirect } from 'react-router-dom';

const Login = ({ isAuthenticated }) => {

    if(isAuthenticated) {
        return <Redirect to='/admin/dashboard' />;
    }

    return <LoginForm />;
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Login);
