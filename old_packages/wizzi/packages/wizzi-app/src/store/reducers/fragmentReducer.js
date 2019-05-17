/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\fragmentreducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { GET_FRAGMENTS, GET_FRAGMENTS_REQUEST, GET_FRAGMENTS_SUCCESS, GET_FRAGMENTS_FAILURE } from '../actions';
import { CREATE_FRAGMENT, CREATE_FRAGMENT_REQUEST, CREATE_FRAGMENT_SUCCESS, CREATE_FRAGMENT_FAILURE } from '../actions';
import { SELECT_FRAGMENT, SELECT_FRAGMENT_REQUEST, SELECT_FRAGMENT_SUCCESS, SELECT_FRAGMENT_FAILURE } from '../actions';
import { UPDATE_FRAGMENT, UPDATE_FRAGMENT_REQUEST, UPDATE_FRAGMENT_SUCCESS, UPDATE_FRAGMENT_FAILURE } from '../actions';
import {FRAGMENT_CHANGED} from '../actions';
const fragmentInitialState = {
    userItems: [], 
    projectItems: []
};
function fragmentReducer(state, action) {
    // log fragmentReducer, state, action
    if (typeof state === 'undefined') {
        return fragmentInitialState;
    }
    switch (action.type) {
        case GET_FRAGMENTS_REQUEST: {
            console.log('GET_FRAGMENTS_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_FRAGMENTS_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_FRAGMENTS_SUCCESS: {
            console.log('GET_FRAGMENTS_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                userItems: Object.values(action.payload.fragments.user), 
                projectItems: Object.values(action.payload.fragments.project), 
                isLoading: false, 
                error: null
            };
            console.log('GET_FRAGMENTS_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_FRAGMENTS_FAILURE: {
            console.log('GET_FRAGMENTS_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                userItems: [], 
                projectItems: [], 
                isLoading: false, 
                error: action.payload.error
            };
            console.log('GET_FRAGMENTS_FAILURE', 'final state:', temp);
            return temp;
        }
        case CREATE_FRAGMENT_SUCCESS: {
            console.log('CREATE_FRAGMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                items: [
                    ...state.items, 
                    action.payload
                ], 
                isLoading: false, 
                error: null
            };
            console.log('CREATE_FRAGMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case SELECT_FRAGMENT: {
            console.log('SELECT_FRAGMENT', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedFragment: state.items.map((item) => {
                    if (item.uri = action.uri) {
                        return item;
                    }
                })
            };
            console.log('SELECT_FRAGMENT', 'final state:', temp);
            return temp;
        }
        case SELECT_FRAGMENT_SUCCESS: {
            console.log('SELECT_FRAGMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedFragmentIttfContent: action.payload, 
                selectedFragmentUri: action.uri, 
                selectedFragmentSchema: action.schema
            };
            console.log('SELECT_FRAGMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case UPDATE_FRAGMENT_SUCCESS: {
            console.log('UPDATE_FRAGMENT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generatedArtifact: null
            };
            console.log('UPDATE_FRAGMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case FRAGMENT_CHANGED: {
            console.log('FRAGMENT_CHANGED', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                selectedFragmentIttfContent: action.newContent
            };
            console.log('FRAGMENT_CHANGED', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default fragmentReducer;
