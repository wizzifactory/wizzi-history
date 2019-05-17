/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\editorreducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import {SELECT_DOCUMENT_SUCCESS, SELECT_FRAGMENT_SUCCESS, UPDATE_DOCUMENT_SUCCESS, UPDATE_FRAGMENT_SUCCESS} from '../actions';
const editorInitialState = {
    selectedContent: '', 
    selectedType: null, 
    selectedUri: null, 
    selectedSchema: null
};
function editorReducer(state, action) {
    // log editorReducer, state, action
    if (typeof state === 'undefined') {
        return editorInitialState;
    }
    switch (action.type) {
        case SELECT_FRAGMENT_SUCCESS: {
            console.log('SELECT_FRAGMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedContent: action.payload, 
                selectedType: 'fragment', 
                selectedUri: action.uri, 
                selectedSchema: action.schema
            };
            console.log('SELECT_FRAGMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case SELECT_DOCUMENT_SUCCESS: {
            console.log('SELECT_DOCUMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedContent: action.payload, 
                selectedType: 'document', 
                selectedUri: action.uri, 
                selectedSchema: action.schema
            };
            console.log('SELECT_DOCUMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case UPDATE_DOCUMENT_SUCCESS: {
            console.log('UPDATE_DOCUMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedContent: action.newIttfContent
            };
            console.log('UPDATE_DOCUMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case UPDATE_FRAGMENT_SUCCESS: {
            console.log('UPDATE_FRAGMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedContent: action.newIttfContent
            };
            console.log('UPDATE_FRAGMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default editorReducer;
