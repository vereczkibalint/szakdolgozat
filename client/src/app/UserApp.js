import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "../common/components/ProtectedRoute";
import { NotFound } from "../common/pages/error-pages";

import { useSelector } from "react-redux";
import api from "../utils/api";
import Navbar from "./components/Navbar";
import ThesesPage from "./pages/theses/ThesesPage";
import LecturerRoute from "../common/components/LecturerRoute";
import CreateThesis from "./pages/theses/CreateThesis";

const UserApp = () => {
    let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    let token = useSelector(state => state.auth.token);

    if(isAuthenticated) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    return (
        <>
            { isAuthenticated ? <Navbar /> : '' }
            <div className="container">
                <Switch>
                    <Route path="/user" exact component={Login} />
                    <Route path="/user/login" exact component={Login} />
                    <ProtectedRoute
                        path="/user/dashboard"
                        exact
                        component={Dashboard}
                    />
                    <ProtectedRoute
                        path="/user/theses"
                        exact
                        component={ThesesPage} />
                    <LecturerRoute
                        path="/user/theses/create"
                        exact
                        component={CreateThesis} />

                    <Route component={NotFound} />
                </Switch>
            </div>
        </>
    );
}

export default UserApp;
