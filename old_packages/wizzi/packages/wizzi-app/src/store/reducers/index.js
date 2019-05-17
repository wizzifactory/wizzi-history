/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\index.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { combineReducers } from 'redux';
import commonsReducer from './commonsReducer';
import schemaReducer from './schemaReducer';
import documentReducer from './documentReducer';
import fragmentReducer from './fragmentReducer';
import editorReducer from './editorReducer';
import artifactReducer from './artifactReducer';
import wizziPackagesReducer from './wizziPackagesReducer';
import wizziIttfReducer from './wizziIttfReducer';
import jobReducer from './jobReducer';
import repoReducer from './repoReducer';
import wizziSystemReducer from './wizziSystemReducer';
export default combineReducers({
    commons: commonsReducer, 
    schema: schemaReducer, 
    document: documentReducer, 
    fragment: fragmentReducer, 
    editor: editorReducer, 
    artifact: artifactReducer, 
    wizziPackages: wizziPackagesReducer, 
    wizziIttf: wizziIttfReducer, 
    job: jobReducer, 
    repo: repoReducer, 
    wizziSystem: wizziSystemReducer
});
