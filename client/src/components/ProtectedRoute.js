import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({
    component: Component,
    isAuthenticated,
    ...rest
}) => {
    if(!isAuthenticated) {
        return <Redirect to="/admin/login" />;
    }
    return(
        <Route
            {...rest}
            render={props => 
                <Component {...props} />
            }
        />
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth
});

export default connect(mapStateToProps,{})(ProtectedRoute);
