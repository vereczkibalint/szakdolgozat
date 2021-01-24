import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from "./pages/login/Login";
import ProtectedRoute from "../common/components/ProtectedRoute";
import { NotFound } from "../common/pages/error-pages";

import { useSelector } from "react-redux";
import api from "../utils/api";
import Navbar from "./components/Navbar";
import ThesesPage from "./pages/theses/ThesesPage";
import LecturerRoute from "../common/components/LecturerRoute";
import CreateThesis from "./pages/theses/CreateThesis";
import MilestonePage from "./pages/milestones/MilestonePage";
import CreateMilestone from "./pages/milestones/CreateMilestone";
import MilestoneDetailsPage from "./pages/milestones/MilestoneDetailsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ConsultationPage from "./pages/consultations/ConsultationPage";
import CreateConsultation from "./pages/consultations/CreateConsultation";

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
                        path="/user/theses"
                        exact
                        component={ThesesPage} />

                    <ProtectedRoute
                        path="/user/consultations"
                        exact
                        component={ConsultationPage} />

                    <LecturerRoute
                        path="/user/consultations/create"
                        exact
                        component={CreateConsultation} />

                    <ProtectedRoute
                        path="/user/milestones"
                        exact
                        component={MilestonePage} />

                    <LecturerRoute
                        path="/user/milestones/create"
                        exact
                        component={CreateMilestone} />

                    <ProtectedRoute
                        path="/user/milestones/:milestoneId"
                        exact
                        component={MilestoneDetailsPage} />

                    <LecturerRoute
                        path="/user/theses/create"
                        exact
                        component={CreateThesis} />

                    <ProtectedRoute
                        path="/user/settings"
                        exact
                        component={SettingsPage} />

                    <Route component={NotFound} />
                </Switch>
            </div>
        </>
    );
}

export default UserApp;
