/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\schemareducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { GET_SCHEMAS, GET_SCHEMAS_REQUEST, GET_SCHEMAS_SUCCESS, GET_SCHEMAS_FAILURE } from '../actions';
import { GET_SCHEMA, GET_SCHEMA_REQUEST, GET_SCHEMA_SUCCESS, GET_SCHEMA_FAILURE } from '../actions';
import { GEN_WFSCHEMA, GEN_WFSCHEMA_REQUEST, GEN_WFSCHEMA_SUCCESS, GEN_WFSCHEMA_FAILURE } from '../actions';
import {GET_ITTF_REQUEST} from '../actions';
const schemaInitialState = {
    items: [], 
    selectedSchemaUri: null, 
    ittfDocument: null, 
    jsonDoc: null, 
    factory: null, 
    model: null, 
    isLoading: false, 
    error: null, 
    isGenerating: false, 
    generationError: null
};
function schemaReducer(state, action) {
    // log schemaReducer, state, action
    if (typeof state === 'undefined') {
        return schemaInitialState;
    }
    switch (action.type) {
        case GET_SCHEMAS_REQUEST: {
            console.log('GET_SCHEMAS_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_SCHEMAS_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMAS_SUCCESS: {
            console.log('GET_SCHEMAS_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                items: action.payload.schemas, 
                isLoading: false, 
                error: null
            };
            console.log('GET_SCHEMAS_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMAS_FAILURE: {
            console.log('GET_SCHEMAS_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                items: [], 
                isLoading: false, 
                error: action.payload.error
            };
            console.log('GET_SCHEMAS_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMA_REQUEST: {
            console.log('GET_SCHEMA_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_SCHEMA_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMA_SUCCESS: {
            console.log('GET_SCHEMA_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedSchemaUri: action.payload.uri, 
                ittfDocument: action.payload.ittfDocument, 
                jsonDoc: action.payload.jsonDoc, 
                factory: action.payload.factory, 
                model: action.payload.model, 
                isLoading: false
            };
            console.log('GET_SCHEMA_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMA_FAILURE: {
            console.log('GET_SCHEMA_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedSchemaUri: null, 
                ittfDocument: null, 
                jsonDoc: null, 
                factory: null, 
                model: null, 
                isLoading: false, 
                error: action.payload.error
            };
            console.log('GET_SCHEMA_FAILURE', 'final state:', temp);
            return temp;
        }
        case GEN_WFSCHEMA_REQUEST: {
            console.log('GEN_WFSCHEMA_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isGenerating: true
            };
            console.log('GEN_WFSCHEMA_REQUEST', 'final state:', temp);
            return temp;
        }
        case GEN_WFSCHEMA_SUCCESS: {
            console.log('GEN_WFSCHEMA_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generationResult: action.payload.result, 
                isGenerating: false, 
                generationError: null
            };
            console.log('GEN_WFSCHEMA_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GEN_WFSCHEMA_FAILURE: {
            console.log('GEN_WFSCHEMA_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generationResult: null, 
                isGenerating: false, 
                generationError: action.payload.error
            };
            console.log('GEN_WFSCHEMA_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_ITTF_REQUEST: {
            console.log('GET_ITTF_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generationResult: null
            };
            console.log('GET_ITTF_REQUEST', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default schemaReducer;
