/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\reducers\documentreducer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { GET_DOCUMENTS_REQUEST, GET_DOCUMENTS_SUCCESS, GET_DOCUMENTS_FAILURE, CREATE_DOCUMENT_SUCCESS, SELECT_DOCUMENT, SELECT_DOCUMENT_SUCCESS, SELECT_DOCUMENT_FAILURE, DOCUMENT_CHANGED, UPDATE_DOCUMENT_SUCCESS, GENERATE_ARTIFACT_SUCCESS } from '../actions';

const documentInitialState = {
    items: []
};

function documentReducer(state, action) {
    // log documentReducer, state, action
    if (typeof state === 'undefined') {
        return documentInitialState;
    }
    switch (action.type) {
        case GET_DOCUMENTS_REQUEST: {
            // log 'GET_DOCUMENTS_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_DOCUMENTS_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_DOCUMENTS_SUCCESS: {
            // log 'GET_DOCUMENTS_SUCCESS', 'initial state:', state
            var temp = {
                items: Object.values(action.payload.documents), 
                isLoading: false, 
                error: null
            };
            console.log('GET_DOCUMENTS_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_DOCUMENTS_FAILURE: {
            // log 'GET_DOCUMENTS_FAILURE', 'initial state:', state
            var temp = {
                items: [], 
                isLoading: false, 
                error: action.failure
            };
            console.log('GET_DOCUMENTS_FAILURE', 'final state:', temp);
            return temp;
        }
        case CREATE_DOCUMENT_SUCCESS: {
            // log 'CREATE_DOCUMENT_SUCCESS', 'initial state:', state
            var temp = {
                items: [
                    ...state.items, 
                    action.payload
                ], 
                isLoading: false, 
                error: null
            };
            console.log('CREATE_DOCUMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case SELECT_DOCUMENT: {
            // log 'SELECT_DOCUMENT', 'initial state:', state
            var temp = {
                ...state, 
                selectedDocument: state.items.map((item) => {
                    if (item.uri = action.uri) {
                        return item;
                    }
                })
            };
            console.log('SELECT_DOCUMENT', 'final state:', temp);
            return temp;
        }
        case SELECT_DOCUMENT_SUCCESS: {
            // log 'SELECT_DOCUMENT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                selectedDocumentIttfContent: action.payload, 
                selectedDocumentUri: action.uri, 
                selectedDocumentSchema: action.schema
            };
            console.log('SELECT_DOCUMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case UPDATE_DOCUMENT_SUCCESS: {
            // log 'UPDATE_DOCUMENT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                generatedArtifact: null, 
                selectedDocumentIttfContent: action.newIttfContent
            };
            console.log('UPDATE_DOCUMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case DOCUMENT_CHANGED: {
            // log 'DOCUMENT_CHANGED', 'initial state:', state
            var temp = {
                ...state, 
                selectedDocumentIttfContent: action.newContent
            };
            console.log('DOCUMENT_CHANGED', 'final state:', temp);
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
