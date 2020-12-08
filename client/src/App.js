import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotFound, Unauthorized } from './pages/error-pages/index';

import AdminApp from './admin/index';
import UserApp from './app/index';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={UserApp}/>

                <Route path="/admin" component={AdminApp}/>

                <Route path="/unauthorized" exact component={Unauthorized}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
};

export default App;