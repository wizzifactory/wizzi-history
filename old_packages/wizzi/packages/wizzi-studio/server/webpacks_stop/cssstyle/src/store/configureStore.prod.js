/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\store\configurestore.prod.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from './reducers';

const configureStore = (preloadedState) => {
    createStore(rootReducer, preloadedState, applyMiddleware(thunk, api)
    )
};

export default configureStore;
