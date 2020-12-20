import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

const LecturerRoute = ({
    component: Component,
    ...rest
}) => {
    let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    let user = useSelector(state => state.auth.user);
    if(!isAuthenticated || !user || (user && user.role !== 'LECTURER')) {
        return <Redirect to="/user" />;
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

export default LecturerRoute;
