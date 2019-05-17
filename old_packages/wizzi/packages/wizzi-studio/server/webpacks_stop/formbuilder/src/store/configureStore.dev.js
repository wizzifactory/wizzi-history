/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\store\configurestore.dev.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';

import { createStore } from 'redux';
import rootReducer from './reducers';

var configureStore = (preloadedState) => {
    
    var store = createStore(rootReducer, preloadedState)
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
