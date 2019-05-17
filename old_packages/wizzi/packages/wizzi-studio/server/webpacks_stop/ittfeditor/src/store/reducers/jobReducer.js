/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\reducers\jobreducer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { EXEC_JOB_REQUEST, EXEC_JOB_SUCCESS, EXEC_JOB_FAILURE } from '../actions';

function jobReducer(state, action) {
    // log jobReducer, state, action
    if (typeof state === 'undefined') {
        return {};
    }
    switch (action.type) {
        case EXEC_JOB_REQUEST: {
            // log 'EXEC_JOB_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('EXEC_JOB_REQUEST', 'final state:', temp);
            return temp;
        }
        case EXEC_JOB_SUCCESS: {
            // log 'EXEC_JOB_SUCCESS', 'initial state:', state
            var temp = {
                isLoading: false, 
                error: null
            };
            console.log('EXEC_JOB_SUCCESS', 'final state:', temp);
            return temp;
        }
        case EXEC_JOB_FAILURE: {
            // log 'EXEC_JOB_FAILURE', 'initial state:', state
            var temp = {
                isLoading: false, 
                error: action.failure
            };
            console.log('EXEC_JOB_FAILURE', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default jobReducer;
