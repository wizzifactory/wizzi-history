/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\store\reducers\consolereducer.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';

import { LIST_CONSOLE_REQUEST, LIST_CONSOLE_SUCCESS, LIST_CONSOLE_FAILURE, GET_CONSOLE_REQUEST, GET_CONSOLE_SUCCESS, GET_CONSOLE_FAILURE, SAVE_CONSOLE_REQUEST, SAVE_CONSOLE_SUCCESS, SAVE_CONSOLE_FAILURE, RUN_CONSOLE_REQUEST, RUN_CONSOLE_SUCCESS, RUN_CONSOLE_FAILURE, CHANGE_VIEW } from '../actions';

const consoleInitialState = {
    isRequestingList: false, 
    jsmodels: [], 
    listerror: null, 
    isRequestingSave: false, 
    generated: null, 
    selectedConsole: null, 
    isRequestingRun: false, 
    stdOut: null, 
    stdErr: null, 
    runerror: null, 
    view: 'list'
};

function consoleReducer(state, action) {
    // log 'consoleReducer', state, action
    if (typeof state === 'undefined') {
        return consoleInitialState;
    }
    switch (action.type) {
        case LIST_CONSOLE_REQUEST: {
            // log 'LIST_CONSOLE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingList: true
            };
            console.log('LIST_CONSOLE_REQUEST', 'final state:', temp);
            return temp;
        }
        case LIST_CONSOLE_SUCCESS: {
            // log 'LIST_CONSOLE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingList: false, 
                jsmodels: action.payload.jsmodels, 
                listerror: null
            };
            console.log('LIST_CONSOLE_SUCCESS', 'final state:', temp);
            return temp;
        }
        case LIST_CONSOLE_FAILURE: {
            // log 'LIST_CONSOLE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingList: false, 
                listerror: action.payload.error
            };
            console.log('LIST_CONSOLE_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_CONSOLE_REQUEST: {
            // log 'GET_CONSOLE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingGet: true
            };
            console.log('GET_CONSOLE_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_CONSOLE_SUCCESS: {
            // log 'GET_CONSOLE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingGet: false, 
                content: action.payload, 
                selectedConsole: action.name, 
                runerror: null
            };
            console.log('GET_CONSOLE_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_CONSOLE_FAILURE: {
            // log 'GET_CONSOLE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingGet: false, 
                content: action.payload.error
            };
            console.log('GET_CONSOLE_FAILURE', 'final state:', temp);
            return temp;
        }
        case SAVE_CONSOLE_REQUEST: {
            // log 'SAVE_CONSOLE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingSave: true
            };
            console.log('SAVE_CONSOLE_REQUEST', 'final state:', temp);
            return temp;
        }
        case SAVE_CONSOLE_SUCCESS: {
            // log 'SAVE_CONSOLE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingSave: false, 
                generated: action.payload.generated, 
                selectedConsole: action.name, 
                runerror: null
            };
            console.log('SAVE_CONSOLE_SUCCESS', 'final state:', temp);
            return temp;
        }
        case SAVE_CONSOLE_FAILURE: {
            // log 'SAVE_CONSOLE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingSave: false, 
                runerror: action.payload.error
            };
            console.log('SAVE_CONSOLE_FAILURE', 'final state:', temp);
            return temp;
        }
        case RUN_CONSOLE_REQUEST: {
            // log 'RUN_CONSOLE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingRun: true
            };
            console.log('RUN_CONSOLE_REQUEST', 'final state:', temp);
            return temp;
        }
        case RUN_CONSOLE_SUCCESS: {
            // log 'RUN_CONSOLE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingRun: false, 
                stdout: action.payload.stdout, 
                stderr: action.payload.stderr, 
                selectedConsole: action.name, 
                runerror: null
            };
            console.log('RUN_CONSOLE_SUCCESS', 'final state:', temp);
            return temp;
        }
        case RUN_CONSOLE_FAILURE: {
            // log 'RUN_CONSOLE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingRun: false, 
                runerror: action.payload.error
            };
            console.log('RUN_CONSOLE_FAILURE', 'final state:', temp);
            return temp;
        }
        case CHANGE_VIEW: {
            // log 'CHANGE_VIEW', 'initial state:', state
            var temp = {
                ...state, 
                view: action.view
            };
            console.log('CHANGE_VIEW', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default consoleReducer;
