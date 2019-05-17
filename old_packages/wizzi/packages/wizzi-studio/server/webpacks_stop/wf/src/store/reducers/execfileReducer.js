/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\store\reducers\execfilereducer.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';

import { LIST_EXECFILE_REQUEST, LIST_EXECFILE_SUCCESS, LIST_EXECFILE_FAILURE, RUN_EXECFILE_REQUEST, RUN_EXECFILE_SUCCESS, RUN_EXECFILE_FAILURE } from '../actions';

function makeArray(dim, init) {
    var ret = [];
    for (var i=0; i<dim; i++) {
        ret[i] = init;
    }
    return ret;
}

function updateArray(arr, index, value) {
    var newarr = arr;
    newarr[index] = value;
    console.log('updateArray', newarr);
    return newarr;
}

const execfileInitialState = {
    isRequestingList: false, 
    isRequestingRun: false, 
    jobfiles: [], 
    jobmodels: [], 
    selectedExecFile: null, 
    listerror: null, 
    stdOut: null, 
    stdErr: null, 
    runerror: null
};

function execfileReducer(state, action) {
    // log 'execfileReducer', state, action
    if (typeof state === 'undefined') {
        return execfileInitialState;
    }
    switch (action.type) {
        case LIST_EXECFILE_REQUEST: {
            // log 'LIST_EXECFILE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingList: true
            };
            console.log('LIST_EXECFILE_REQUEST', 'final state:', temp);
            return temp;
        }
        case LIST_EXECFILE_SUCCESS: {
            // log 'LIST_EXECFILE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingList: false, 
                jobfiles: action.payload.files, 
                jobmodels: action.payload.models, 
                listerror: null
            };
            console.log('LIST_EXECFILE_SUCCESS', 'final state:', temp);
            return temp;
        }
        case LIST_EXECFILE_FAILURE: {
            // log 'LIST_EXECFILE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingList: false, 
                listerror: action.payload.error
            };
            console.log('LIST_EXECFILE_FAILURE', 'final state:', temp);
            return temp;
        }
        case RUN_EXECFILE_REQUEST: {
            // log 'RUN_EXECFILE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingRun: true
            };
            console.log('RUN_EXECFILE_REQUEST', 'final state:', temp);
            return temp;
        }
        case RUN_EXECFILE_SUCCESS: {
            // log 'RUN_EXECFILE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingRun: false, 
                stdout: action.payload.stdout, 
                stderr: action.payload.stderr, 
                selectedExecFile: action.name, 
                runerror: null
            };
            console.log('RUN_EXECFILE_SUCCESS', 'final state:', temp);
            return temp;
        }
        case RUN_EXECFILE_FAILURE: {
            // log 'RUN_EXECFILE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequestingRun: false, 
                runerror: action.payload.error
            };
            console.log('RUN_EXECFILE_FAILURE', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default execfileReducer;
