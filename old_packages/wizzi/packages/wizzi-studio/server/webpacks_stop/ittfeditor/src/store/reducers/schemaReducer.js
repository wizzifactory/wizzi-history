/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\reducers\schemareducer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { GET_SCHEMAS_REQUEST, GET_SCHEMAS_SUCCESS, GET_SCHEMAS_FAILURE, GET_SCHEMA_REQUEST, GET_SCHEMA_SUCCESS, GET_SCHEMA_FAILURE } from '../actions';

const schemaInitialState = {
    items: []
};

function schemaReducer(state, action) {
    // log schemaReducer, state, action
    if (typeof state === 'undefined') {
        return schemaInitialState;
    }
    switch (action.type) {
        case GET_SCHEMAS_REQUEST: {
            // log 'GET_SCHEMAS_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_SCHEMAS_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMAS_SUCCESS: {
            // log 'GET_SCHEMAS_SUCCESS', 'initial state:', state
            var temp = {
                items: action.payload.schemas, 
                isLoading: false, 
                error: null
            };
            console.log('GET_SCHEMAS_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMAS_FAILURE: {
            // log 'GET_SCHEMAS_FAILURE', 'initial state:', state
            var temp = {
                items: [], 
                isLoading: false, 
                error: action.failure
            };
            console.log('GET_SCHEMAS_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMA_REQUEST: {
            // log 'GET_SCHEMA_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_SCHEMA_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMA_SUCCESS: {
            // log 'GET_SCHEMA_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                selectedSchemaUri: action.payload.uri, 
                ittfDocument: action.payload.ittfDocument, 
                jsonDoc: action.payload.jsonDoc, 
                factory: action.payload.factory, 
                model: action.payload.model
            };
            console.log('GET_SCHEMA_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_SCHEMA_FAILURE: {
            // log 'GET_SCHEMA_FAILURE', 'initial state:', state
            var temp = {
                items: [], 
                isLoading: false, 
                error: action.failure
            };
            console.log('GET_SCHEMA_FAILURE', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default schemaReducer;
