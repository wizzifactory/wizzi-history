/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\reducers\artifactreducer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { GENERATE_ARTIFACT_REQUEST, GENERATE_ARTIFACT_SUCCESS, GENERATE_ARTIFACT_FAILURE, SELECT_DOCUMENT_SUCCESS, SELECT_FRAGMENT_SUCCESS } from '../actions';

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
            // log 'GENERATE_ARTIFACT_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isGenerating: true
            };
            console.log('GENERATE_ARTIFACT_REQUEST', 'final state:', temp);
            return temp;
        }
        case GENERATE_ARTIFACT_SUCCESS: {
            // log 'GENERATE_ARTIFACT_SUCCESS', 'initial state:', state
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
            // log 'GENERATE_ARTIFACT_FAILURE', 'initial state:', state
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
            // log 'SELECT_DOCUMENT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                generatedArtifact: null, 
                error: null
            };
            console.log('SELECT_DOCUMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case SELECT_FRAGMENT_SUCCESS: {
            // log 'SELECT_FRAGMENT_SUCCESS', 'initial state:', state
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
