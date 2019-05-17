/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\configurestore.prod.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from './reducers';

const configureStore = (preloadedState) => {
    createStore(rootReducer, preloadedState, applyMiddleware(thunk, api));
};

export default configureStore;
