/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\reducers\commonsreducer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { INITIAL_LOAD_SUCCESS, SELECT_PROJECT_SUCCESS, CREATE_PROJECT_SUCCESS } from '../actions';

const commonsInitialState = {
    userState: {}, 
    projects: [], 
    pluginProjects: [], 
    schemas: {
        js: {
            artifacts: [
                'js/module'
            ]
        }, 
        html: {
            artifacts: [
                'html/document'
            ]
        }, 
        css: {
            artifacts: [
                'css/document'
            ]
        }
    }
};

function commonsReducer(state, action) {
    // log commonsReducer, state, action
    if (typeof state === 'undefined') {
        return commonsInitialState;
    }
    switch (action.type) {
        case INITIAL_LOAD_SUCCESS: {
            // log 'INITIAL_LOAD_SUCCESS', 'initial state:', state
            var userState = action.payload.userState || {};
            var temp = {
                ...state, 
                userState: userState, 
                schemas: action.payload.schemas, 
                projects: action.payload.projects, 
                currentProject: userState.currentProject
            };
            console.log('INITIAL_LOAD_SUCCESS', 'final state:', temp);
            return temp;
        }
        case SELECT_PROJECT_SUCCESS: {
            // log 'SELECT_PROJECT_SUCCESS', 'initial state:', state
            var userState = action.payload || {};
            var temp = {
                ...state, 
                userState: userState, 
                currentProject: userState.currentProject
            };
            console.log('SELECT_PROJECT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case CREATE_PROJECT_SUCCESS: {
            // log 'CREATE_PROJECT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                projects: action.payload.projects, 
                currentProject: action.payload.inserted.name
            };
            console.log('CREATE_PROJECT_SUCCESS', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default commonsReducer;
