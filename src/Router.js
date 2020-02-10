import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from "./App";
import NotFound from './components/NotFound';

const Router = (theLanding) => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/callback" component={App} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;