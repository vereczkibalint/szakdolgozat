import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({
    component: Component,
    permissions,
    ...rest
}) => {
    const user = localStorage.getItem('user');
    const userRole = JSON.parse(user).role;
    return(
        <Route
            {...rest}
            render={props => 
                permissions.includes(userRole) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/unauthorized' />
                )   
            }
        />
    );
}

ProtectedRoute.propTypes = {
    permissions: PropTypes.array.isRequired
};

export default ProtectedRoute;
