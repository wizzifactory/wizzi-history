/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\store\reducers\index.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';

import { combineReducers } from 'redux';
import commonsReducer from './commonsReducer';
import execfileReducer from './execfileReducer';
import consoleReducer from './consoleReducer';
import wizzifierReducer from './wizzifierReducer';

export default combineReducers({
    commons: commonsReducer, 
    execfile: execfileReducer, 
    console: consoleReducer, 
    wizzifier: wizzifierReducer
})
;
