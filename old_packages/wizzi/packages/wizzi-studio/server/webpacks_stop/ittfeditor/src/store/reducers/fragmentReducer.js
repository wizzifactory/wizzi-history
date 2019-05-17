/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\reducers\fragmentreducer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { GET_FRAGMENTS_REQUEST, GET_FRAGMENTS_SUCCESS, GET_FRAGMENTS_FAILURE, CREATE_FRAGMENT_SUCCESS, SELECT_FRAGMENT, SELECT_FRAGMENT_SUCCESS, SELECT_FRAGMENT_FAILURE, FRAGMENT_CHANGED, UPDATE_FRAGMENT_SUCCESS, } from '../actions';

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
            // log 'GET_FRAGMENTS_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_FRAGMENTS_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_FRAGMENTS_SUCCESS: {
            // log 'GET_FRAGMENTS_SUCCESS', 'initial state:', state
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
            // log 'GET_FRAGMENTS_FAILURE', 'initial state:', state
            var temp = {
                userItems: [], 
                projectItems: [], 
                isLoading: false, 
                error: action.failure
            };
            console.log('GET_FRAGMENTS_FAILURE', 'final state:', temp);
            return temp;
        }
        case CREATE_FRAGMENT_SUCCESS: {
            // log 'CREATE_FRAGMENT_SUCCESS', 'initial state:', state
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
            // log 'SELECT_FRAGMENT', 'initial state:', state
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
            // log 'SELECT_FRAGMENT_SUCCESS', 'initial state:', state
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
            // log 'UPDATE_FRAGMENT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                generatedArtifact: null
            };
            console.log('UPDATE_FRAGMENT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case FRAGMENT_CHANGED: {
            // log 'FRAGMENT_CHANGED', 'initial state:', state
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
