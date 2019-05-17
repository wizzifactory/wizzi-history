/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\store\configurestore.dev.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

var configureStore = (preloadedState) => {
    
    var store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, api, createLogger())
    )
    ;
    
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            var nextRootReducer = require('./reducers').default
            ;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
};

export default configureStore;
