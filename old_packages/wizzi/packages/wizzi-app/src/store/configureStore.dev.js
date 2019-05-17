/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\configurestore.dev.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
// configureStore is called by the app entry point ( index.js )
import { createStore, applyMiddleware } from 'redux';
import api from '../middleware/api';
import { initialLoad } from './actions';
import rootReducer from './reducers';
var create = (preloadedState) => {
    // TODO Can these stay outside of create() and
    // avoid to initialize firebase at each call when executed server side?
    const middlewares = applyMiddleware(api);
    var store = createStore(rootReducer, preloadedState, middlewares);
    return store;
};
export default function configureStore(initialState) {
    // Make sure to create a new store for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        let store = create(initialState);
        store.dispatch(initialLoad());
        return store;
    }
    // Reuse store on the client-side
    if (!global.__INIT_REDUX_STORE__) {
        let store = create(initialState);
        store.dispatch(initialLoad());
        global.__INIT_REDUX_STORE__ = store;
    }
    return global.__INIT_REDUX_STORE__;
};
