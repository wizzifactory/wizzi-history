/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\store\reducers\wizzifierreducer.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';

import { wizzifyTypes, JS_WIZZIFY_REQUEST, JS_WIZZIFY_SUCCESS, JS_WIZZIFY_FAILURE, HTML_WIZZIFY_REQUEST, HTML_WIZZIFY_SUCCESS, HTML_WIZZIFY_FAILURE, CSS_WIZZIFY_REQUEST, CSS_WIZZIFY_SUCCESS, CSS_WIZZIFY_FAILURE, XML_WIZZIFY_REQUEST, XML_WIZZIFY_SUCCESS, XML_WIZZIFY_FAILURE } from '../actions';

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

const wizzifierInitialState = {
    isRequesting: -1, 
    lastSource: makeArray(4, null), 
    wizzified: makeArray(4, null)
};

function wizzifierReducer(state, action) {
    // log 'wizzifierReducer', state, action
    if (typeof state === 'undefined') {
        return wizzifierInitialState;
    }
    switch (action.type) {
        case JS_WIZZIFY_REQUEST: {
            // log 'JS_WIZZIFY_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: 0
            };
            console.log('JS_WIZZIFY_REQUEST', 'final state:', temp);
            return temp;
        }
        case JS_WIZZIFY_SUCCESS: {
            // log 'JS_WIZZIFY_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: -1, 
                lastSource: state.lastSource[0] = action.source, 
                wizzified: updateArray(state.wizzified, 0, action.payload.wizzified)
            };
            console.log('JS_WIZZIFY_SUCCESS', 'final state:', temp);
            return temp;
        }
        case JS_WIZZIFY_FAILURE: {
            // log 'JS_WIZZIFY_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: -1, 
                wizzified: updateArray(state.wizzified, 0, action.payload.error)
            };
            console.log('JS_WIZZIFY_FAILURE', 'final state:', temp);
            return temp;
        }
        case HTML_WIZZIFY_REQUEST: {
            // log 'HTML_WIZZIFY_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: 1
            };
            console.log('HTML_WIZZIFY_REQUEST', 'final state:', temp);
            return temp;
        }
        case HTML_WIZZIFY_SUCCESS: {
            // log 'HTML_WIZZIFY_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: -1, 
                lastSource: state.lastSource[1] = action.source, 
                wizzified: updateArray(state.wizzified, 1, action.payload.wizzified)
            };
            console.log('HTML_WIZZIFY_SUCCESS', 'final state:', temp);
            return temp;
        }
        case HTML_WIZZIFY_FAILURE: {
            // log 'HTML_WIZZIFY_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: -1, 
                wizzified: updateArray(state.wizzified, 1, action.payload.error)
            };
            console.log('HTML_WIZZIFY_FAILURE', 'final state:', temp);
            return temp;
        }
        case CSS_WIZZIFY_REQUEST: {
            // log 'CSS_WIZZIFY_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: 2
            };
            console.log('CSS_WIZZIFY_REQUEST', 'final state:', temp);
            return temp;
        }
        case CSS_WIZZIFY_SUCCESS: {
            // log 'CSS_WIZZIFY_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: -1, 
                lastSource: state.lastSource[2] = action.source, 
                wizzified: updateArray(state.wizzified, 2, action.payload.wizzified)
            };
            console.log('CSS_WIZZIFY_SUCCESS', 'final state:', temp);
            return temp;
        }
        case CSS_WIZZIFY_FAILURE: {
            // log 'CSS_WIZZIFY_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: -1, 
                wizzified: updateArray(state.wizzified, 2, action.payload.error)
            };
            console.log('CSS_WIZZIFY_FAILURE', 'final state:', temp);
            return temp;
        }
        case XML_WIZZIFY_REQUEST: {
            // log 'XML_WIZZIFY_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: 3
            };
            console.log('XML_WIZZIFY_REQUEST', 'final state:', temp);
            return temp;
        }
        case XML_WIZZIFY_SUCCESS: {
            // log 'XML_WIZZIFY_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: -1, 
                lastSource: state.lastSource[3] = action.source, 
                wizzified: updateArray(state.wizzified, 3, action.payload.wizzified)
            };
            console.log('XML_WIZZIFY_SUCCESS', 'final state:', temp);
            return temp;
        }
        case XML_WIZZIFY_FAILURE: {
            // log 'XML_WIZZIFY_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isRequesting: -1, 
                wizzified: updateArray(state.wizzified, 3, action.payload.error)
            };
            console.log('XML_WIZZIFY_FAILURE', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default wizzifierReducer;
