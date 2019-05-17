/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\reducers\artifactreducer.js.ittf
    utc time: Thu, 31 Jan 2019 10:21:44 GMT
*/
'use strict';
import { GENERATE_ARTIFACT_REQUEST, GENERATE_ARTIFACT_SUCCESS, GENERATE_ARTIFACT_FAILURE } from '../actions';
import { EXAMPLE_SELECTION, SELECT_FRAGMENT_REQUEST } from '../actions';
const artifactInitialState = {
    isGenerating: false, 
    generateError: null, 
    generatedText: ''
};
function artifactReducer(state, action) {
    // log artifactReducer, state, action
    if (typeof state === 'undefined') {
        return artifactInitialState;
    }
    switch (action.type) {
        case GENERATE_ARTIFACT_REQUEST: {
            // log 'GENERATE_ARTIFACT_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isGenerating: true, 
                generateError: null
            };
            // log 'GENERATE_ARTIFACT_REQUEST', 'final state:', temp
            return temp;
        }
        case GENERATE_ARTIFACT_SUCCESS: {
            // log 'GENERATE_ARTIFACT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                generatedText: action.text, 
                isGenerating: false, 
                generateError: null
            };
            // log 'GENERATE_ARTIFACT_SUCCESS', 'final state:', temp
            return temp;
        }
        case GENERATE_ARTIFACT_FAILURE: {
            // log 'GENERATE_ARTIFACT_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                generatedText: '', 
                isGenerating: false, 
                generateError: action.error
            };
            // log 'GENERATE_ARTIFACT_FAILURE', 'final state:', temp
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default artifactReducer;
