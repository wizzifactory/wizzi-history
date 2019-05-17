/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\configurestore.prod.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { createStore, applyMiddleware } from 'redux';
import api from '../middleware/api';
import rootReducer from './reducers';
const configureStore = (preloadedState) => {
    createStore(rootReducer, preloadedState, applyMiddleware(api));
};
export default configureStore;
