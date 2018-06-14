import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from './reducers.js';
import promiseMiddleware from './middleware/promiseMiddleware';// 自定义中间件

// let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));
let store;
if(!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)){
    store = createStore(combineReducers, applyMiddleware(promiseMiddleware));
}else{
    store = createStore(
        combineReducers,
        compose(applyMiddleware(promiseMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
}

// redux 模块热替换
if (module.hot) {
    module.hot.accept("./reducers", () => {
        const nextCombineReducers = require("./reducers").default;
        store.replaceReducer(nextCombineReducers);
    });
}

export default store;