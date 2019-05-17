/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\documentreducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { GET_DOCUMENTS, GET_DOCUMENTS_REQUEST, GET_DOCUMENTS_SUCCESS, GET_DOCUMENTS_FAILURE } from '../actions';
import { CREATE_DOCUMENT, CREATE_DOCUMENT_REQUEST, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAILURE } from '../actions';
import { SELECT_DOCUMENT, SELECT_DOCUMENT_REQUEST, SELECT_DOCUMENT_SUCCESS, SELECT_DOCUMENT_FAILURE } from '../actions';
import { UPDATE_DOCUMENT, UPDATE_DOCUMENT_REQUEST, UPDATE_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_FAILURE } from '../actions';
import {DOCUMENT_CHANGED, GENERATE_ARTIFACT_SUCCESS} from '../actions';
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
            console.log('GET_DOCUMENTS_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_DOCUMENTS_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_DOCUMENTS_SUCCESS: {
            console.log('GET_DOCUMENTS_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                items: Object.values(action.payload.documents), 
                isLoading: false, 
                error: null
            };
            console.log('GET_DOCUMENTS_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_DOCUMENTS_FAILURE: {
            console.log('GET_DOCUMENTS_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                items: [], 
                isLoading: false, 
                error: action.payload.error
            };
            console.log('GET_DOCUMENTS_FAILURE', 'final state:', temp);
            return temp;
        }
        case CREATE_DOCUMENT_SUCCESS: {
            console.log('CREATE_DOCUMENT_SUCCESS', 'initial state:', state, 'action', action);
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
            console.log('SELECT_DOCUMENT', 'initial state:', state, 'action', action);
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
            console.log('SELECT_DOCUMENT_SUCCESS', 'initial state:', state, 'action', action);
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
            console.log('UPDATE_DOCUMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generatedArtifact: null, 
                selectedDocumentIttfContent: action.newIttfContent
            };
            console.log('UPDATE_DOCUMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case DOCUMENT_CHANGED: {
            console.log('DOCUMENT_CHANGED', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedDocumentIttfContent: action.newContent
            };
            console.log('DOCUMENT_CHANGED', 'final state:', temp);
            return temp;
        }
        case GENERATE_ARTIFACT_SUCCESS: {
            console.log('GENERATE_ARTIFACT_SUCCESS', 'initial state:', state, 'action', action);
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
