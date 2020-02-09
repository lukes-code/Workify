import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from "./App";
import Landing from "./components/Landing";
import NotFound from './components/NotFound';
import Welcome from './components/Welcome';

const Router = (theLanding) => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/callback" component={App} />
            {/* <Route path="/home" component={App} /> */}
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;