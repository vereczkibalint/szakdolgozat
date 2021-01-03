import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { NotFound, Unauthorized } from './common/pages/error-pages/index';

import AdminApp from './admin/index';
import UserApp from './app/index';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/user" component={UserApp}/>
                <Route path="/admin" component={AdminApp}/>
                <Redirect from="/" to="/user" />
                <Route path="/unauthorized" exact component={Unauthorized}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
};

export default App;