import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useSelector} from "react-redux";

const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    let isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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

export default ProtectedRoute;
