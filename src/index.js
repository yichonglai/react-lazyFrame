import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Router } from 'react-router-dom';
import history from 'router/history';
import getRouter from 'router/router';

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <Router history={history}>
                    <RootElement />
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
}

if (module.hot) {
    module.hot.accept('router/router', () => {
        const router = require('router/router').default;
        renderWithHotReload(router);
    });
}

renderWithHotReload(getRouter);
