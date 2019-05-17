/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\store\reducers\index.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import commonsReducer from './commonsReducer';

export default combineReducers({
    commons: commonsReducer, 
    form: formReducer
})
;
