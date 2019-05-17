/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\store\configurestore.prod.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';

import { createStore } from 'redux';
import rootReducer from './reducers';

const configureStore = (preloadedState) => {
    createStore(rootReducer, preloadedState)
};

export default configureStore;
