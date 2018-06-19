import React, { Component } from 'react';
import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

const lazyComponent = component => props => (
    <Bundle load={component}>
        {
            Component => Component ? <Component {...props} /> : <Loading />
        }
    </Bundle>
);

export default lazyComponent;
