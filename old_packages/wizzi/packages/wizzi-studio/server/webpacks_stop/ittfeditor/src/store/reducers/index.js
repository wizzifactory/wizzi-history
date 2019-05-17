/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\reducers\index.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import commonsReducer from './commonsReducer';
import documentReducer from './documentReducer';
import fragmentReducer from './fragmentReducer';
import editorReducer from './editorReducer';
import artifactReducer from './artifactReducer';
import schemaReducer from './schemaReducer';
import jobReducer from './jobReducer';

export default combineReducers({
    theme: themeReducer, 
    commons: commonsReducer, 
    document: documentReducer, 
    fragment: fragmentReducer, 
    editor: editorReducer, 
    artifact: artifactReducer, 
    schema: schemaReducer, 
    job: jobReducer
});
