import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import PrivateRoute from './PrivateRoute';
import lazyComponent from './lazyComponent';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={lazyComponent(Home)}/>
                <Route path="/page1" component={lazyComponent(Page1)}/>
                <Route path="/counter" component={lazyComponent(Counter)}/>
                <Route path="/userinfo" component={lazyComponent(UserInfo)}/>
                <Route component={lazyComponent(NotFound)}/>
            </Switch>
        )
    }
}
