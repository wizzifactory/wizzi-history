/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\reducers\projectreducer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE, CREATE_PROJECT_SUCCESS, SELECT_PROJECT, SELECT_PROJECT_SUCCESS, SELECT_PROJECT_FAILURE, PROJECT_CHANGED, UPDATE_PROJECT_SUCCESS, GENERATE_ARTIFACT_SUCCESS } from '../actions';

const documentInitialState = {
    items: []
};

function documentReducer(state, action) {
    // log documentReducer, state, action
    if (typeof state === 'undefined') {
        return documentInitialState;
    }
    switch (action.type) {
        case GET_PROJECTS_REQUEST: {
            // log 'GET_PROJECTS_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_PROJECTS_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_PROJECTS_SUCCESS: {
            // log 'GET_PROJECTS_SUCCESS', 'initial state:', state
            var temp = {
                items: Object.values(action.payload.documents), 
                isLoading: false, 
                error: null
            };
            console.log('GET_PROJECTS_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_PROJECTS_FAILURE: {
            // log 'GET_PROJECTS_FAILURE', 'initial state:', state
            var temp = {
                items: [], 
                isLoading: false, 
                error: action.failure
            };
            console.log('GET_PROJECTS_FAILURE', 'final state:', temp);
            return temp;
        }
        case CREATE_PROJECT_SUCCESS: {
            // log 'CREATE_PROJECT_SUCCESS', 'initial state:', state
            var temp = {
                items: [
                    ...state.items, 
                    action.payload
                ], 
                isLoading: false, 
                error: null
            };
            console.log('CREATE_PROJECT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case SELECT_PROJECT: {
            // log 'SELECT_PROJECT', 'initial state:', state
            var temp = {
                ...state, 
                selectedDocument: state.items.map((item) => {
                    if (item.uri = action.uri) {
                        return item;
                    }
                })
            };
            console.log('SELECT_PROJECT', 'final state:', temp);
            return temp;
        }
        case SELECT_PROJECT_SUCCESS: {
            // log 'SELECT_PROJECT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                selectedDocumentIttfContent: action.payload, 
                selectedDocumentUri: action.uri, 
                selectedDocumentSchema: action.schema
            };
            console.log('SELECT_PROJECT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case UPDATE_PROJECT_SUCCESS: {
            // log 'UPDATE_PROJECT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                generatedArtifact: null
            };
            console.log('UPDATE_PROJECT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case PROJECT_CHANGED: {
            // log 'PROJECT_CHANGED', 'initial state:', state
            var temp = {
                ...state, 
                selectedDocumentIttfContent: action.newContent
            };
            console.log('PROJECT_CHANGED', 'final state:', temp);
            return temp;
        }
        case GENERATE_ARTIFACT_SUCCESS: {
            // log 'GENERATE_ARTIFACT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                generatedArtifact: action.payload.generatedArtifact, 
                evaluatedIttfModel: action.payload.evaluatedIttfModel, 
                evaluationScript: action.payload.evaluationScript
            };
            console.log('GENERATE_ARTIFACT_SUCCESS', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default documentReducer;
