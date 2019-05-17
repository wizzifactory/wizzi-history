/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\artifactreducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { GENERATE_ARTIFACT, GENERATE_ARTIFACT_REQUEST, GENERATE_ARTIFACT_SUCCESS, GENERATE_ARTIFACT_FAILURE } from '../actions';
import {SELECT_DOCUMENT_SUCCESS, SELECT_FRAGMENT_SUCCESS} from '../actions';
const artifactInitialState = {
    generatedArtifact: null
};
function artifactReducer(state, action) {
    // log artifactReducer, state, action
    if (typeof state === 'undefined') {
        return artifactInitialState;
    }
    switch (action.type) {
        case GENERATE_ARTIFACT_REQUEST: {
            console.log('GENERATE_ARTIFACT_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isGenerating: true
            };
            console.log('GENERATE_ARTIFACT_REQUEST', 'final state:', temp);
            return temp;
        }
        case GENERATE_ARTIFACT_SUCCESS: {
            console.log('GENERATE_ARTIFACT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isGenerating: false, 
                generatedArtifact: action.payload.data, 
                error: null
            };
            console.log('GENERATE_ARTIFACT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GENERATE_ARTIFACT_FAILURE: {
            console.log('GENERATE_ARTIFACT_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isGenerating: false, 
                generatedArtifact: null, 
                error: action.payload.error
            };
            console.log('GENERATE_ARTIFACT_FAILURE', 'final state:', temp);
            return temp;
        }
        case SELECT_DOCUMENT_SUCCESS: {
            console.log('SELECT_DOCUMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generatedArtifact: null, 
                error: null
            };
            console.log('SELECT_DOCUMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case SELECT_FRAGMENT_SUCCESS: {
            console.log('SELECT_FRAGMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generatedArtifact: null, 
                error: null
            };
            console.log('SELECT_FRAGMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default artifactReducer;
