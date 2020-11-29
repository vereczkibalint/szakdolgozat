import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({
    component: Component,
    permissions,
    user,
    ...rest
}) => {
    if(!user) {
        return <Redirect to='/admin' />;
    }
    return(
        <Route
            {...rest}
            render={props => 
                permissions.includes(user.role) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/admin' />
                )   
            }
        />
    );
}

ProtectedRoute.propTypes = {
    permissions: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(ProtectedRoute);
