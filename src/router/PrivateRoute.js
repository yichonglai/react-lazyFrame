import React from 'react';
import { Route, Redirect } from 'react-router-domb';
import Cookies from 'js-cookie';
import history from './history';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLogin = Cookies.get('PS_IS_LOGIN');
    return (
        <Route
            {...rest}
            render={props =>
                isLogin ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={`/login?redirect_uri=${encodeURIComponent(`${history.location.pathname}${history.location.search}`)}`} />
                )
            }
        />
    );
};

export default PrivateRoute;
