/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\jobreducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { EXECUTE_WFJOB, EXECUTE_WFJOB_REQUEST, EXECUTE_WFJOB_SUCCESS, EXECUTE_WFJOB_FAILURE } from '../actions';
import { GET_JOB_BATCHES, GET_JOB_BATCHES_REQUEST, GET_JOB_BATCHES_SUCCESS, GET_JOB_BATCHES_FAILURE } from '../actions';
import { GET_JOB_BATCH, GET_JOB_BATCH_REQUEST, GET_JOB_BATCH_SUCCESS, GET_JOB_BATCH_FAILURE } from '../actions';
import { GET_JOB_GISTS, GET_JOB_GISTS_REQUEST, GET_JOB_GISTS_SUCCESS, GET_JOB_GISTS_FAILURE } from '../actions';
import { GET_JOB_GIST, GET_JOB_GIST_REQUEST, GET_JOB_GIST_SUCCESS, GET_JOB_GIST_FAILURE } from '../actions';
import { CREATE_JOB_GIST, CREATE_JOB_GIST_REQUEST, CREATE_JOB_GIST_SUCCESS, CREATE_JOB_GIST_FAILURE } from '../actions';
import { UPDATE_JOB_GIST, UPDATE_JOB_GIST_REQUEST, UPDATE_JOB_GIST_SUCCESS, UPDATE_JOB_GIST_FAILURE } from '../actions';
import { DELETE_JOB_GIST, DELETE_JOB_GIST_REQUEST, DELETE_JOB_GIST_SUCCESS, DELETE_JOB_GIST_FAILURE } from '../actions';
import { DUPLICATE_JOB_GIST, DUPLICATE_JOB_GIST_REQUEST, DUPLICATE_JOB_GIST_SUCCESS, DUPLICATE_JOB_GIST_FAILURE } from '../actions';
import { RENAME_JOB_GIST, RENAME_JOB_GIST_REQUEST, RENAME_JOB_GIST_SUCCESS, RENAME_JOB_GIST_FAILURE } from '../actions';
import { WIZZIFY_JOB_SNIPPET, WIZZIFY_JOB_SNIPPET_REQUEST, WIZZIFY_JOB_SNIPPET_SUCCESS, WIZZIFY_JOB_SNIPPET_FAILURE } from '../actions';
import { CHANGED_JOB_GIST } from '../actions';
import { CLEAR_JOB_NAVIGATIONS } from '../actions';
import {GET_ITTF_REQUEST} from '../actions';
const jobInitialState = {
    executionResult: null, 
    isLoading: false, 
    isWizzifying: false, 
    executionError: null, 
    loadingError: null, 
    wizzifyingError: null, 
    batches: [], 
    batch: null, 
    gists: [], 
    fragments: [], 
    contexts: [], 
    gists: [], 
    gist: null, 
    snippets: [], 
    snippet: null, 
    toSnippet: null, 
    toGist: null, 
    toWfJob: null
};
function jobReducer(state, action) {
    // log jobReducer, state, action
    if (typeof state === 'undefined') {
        return jobInitialState;
    }
    switch (action.type) {
        case EXECUTE_WFJOB_REQUEST: {
            console.log('EXECUTE_WFJOB_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('EXECUTE_WFJOB_REQUEST', 'final state:', temp);
            return temp;
        }
        case EXECUTE_WFJOB_SUCCESS: {
            console.log('EXECUTE_WFJOB_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                executionResult: action.payload.result, 
                isLoading: false, 
                executionError: null
            };
            console.log('EXECUTE_WFJOB_SUCCESS', 'final state:', temp);
            return temp;
        }
        case EXECUTE_WFJOB_FAILURE: {
            console.log('EXECUTE_WFJOB_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                executionResult: null, 
                isLoading: false, 
                executionError: action.payload.error
            };
            console.log('EXECUTE_WFJOB_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_ITTF_REQUEST: {
            console.log('GET_ITTF_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                executionResult: null
            };
            console.log('GET_ITTF_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_JOB_BATCHES_REQUEST: {
            console.log('GET_JOB_BATCHES_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_JOB_BATCHES_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_JOB_BATCHES_SUCCESS: {
            console.log('GET_JOB_BATCHES_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                batches: action.payload.batches, 
                isLoading: false, 
                loadingError: null
            };
            console.log('GET_JOB_BATCHES_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_JOB_BATCHES_FAILURE: {
            console.log('GET_JOB_BATCHES_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                batches: [], 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('GET_JOB_BATCHES_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_JOB_BATCH_REQUEST: {
            console.log('GET_JOB_BATCH_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_JOB_BATCH_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_JOB_BATCH_SUCCESS: {
            console.log('GET_JOB_BATCH_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                batch: action.payload.batch, 
                isLoading: false, 
                loadingError: null
            };
            console.log('GET_JOB_BATCH_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_JOB_BATCH_FAILURE: {
            console.log('GET_JOB_BATCH_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                batch: null, 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('GET_JOB_BATCH_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_JOB_GISTS_REQUEST: {
            console.log('GET_JOB_GISTS_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_JOB_GISTS_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_JOB_GISTS_SUCCESS: {
            console.log('GET_JOB_GISTS_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                gists: action.payload.gists, 
                fragments: action.payload.fragments, 
                contexts: action.payload.contexts, 
                snippets: action.payload.snippets, 
                isLoading: false, 
                loadingError: null
            };
            console.log('GET_JOB_GISTS_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_JOB_GISTS_FAILURE: {
            console.log('GET_JOB_GISTS_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                gists: [], 
                snippets: [], 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('GET_JOB_GISTS_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_JOB_GIST_REQUEST: {
            console.log('GET_JOB_GIST_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('GET_JOB_GIST_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_JOB_GIST_SUCCESS: {
            console.log('GET_JOB_GIST_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                gist: action.payload.gist, 
                snippet: action.payload.snippet, 
                isLoading: false, 
                loadingError: null
            };
            console.log('GET_JOB_GIST_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_JOB_GIST_FAILURE: {
            console.log('GET_JOB_GIST_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('GET_JOB_GIST_FAILURE', 'final state:', temp);
            return temp;
        }
        case CREATE_JOB_GIST_REQUEST: {
            console.log('CREATE_JOB_GIST_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('CREATE_JOB_GIST_REQUEST', 'final state:', temp);
            return temp;
        }
        case CREATE_JOB_GIST_SUCCESS: {
            console.log('CREATE_JOB_GIST_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                gist: action.payload.gist, 
                gists: action.payload.gists, 
                fragments: action.payload.fragments, 
                contexts: action.payload.contexts, 
                snippet: action.payload.snippet, 
                snippets: action.payload.snippets, 
                toSnippet: action.payload.snippet, 
                toGist: action.payload.gist, 
                isLoading: false, 
                loadingError: null
            };
            console.log('CREATE_JOB_GIST_SUCCESS', 'final state:', temp);
            return temp;
        }
        case CREATE_JOB_GIST_FAILURE: {
            console.log('CREATE_JOB_GIST_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('CREATE_JOB_GIST_FAILURE', 'final state:', temp);
            return temp;
        }
        case UPDATE_JOB_GIST_REQUEST: {
            console.log('UPDATE_JOB_GIST_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('UPDATE_JOB_GIST_REQUEST', 'final state:', temp);
            return temp;
        }
        case UPDATE_JOB_GIST_SUCCESS: {
            console.log('UPDATE_JOB_GIST_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: false, 
                loadingError: null
            };
            console.log('UPDATE_JOB_GIST_SUCCESS', 'final state:', temp);
            return temp;
        }
        case UPDATE_JOB_GIST_FAILURE: {
            console.log('UPDATE_JOB_GIST_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('UPDATE_JOB_GIST_FAILURE', 'final state:', temp);
            return temp;
        }
        case CHANGED_JOB_GIST: {
            console.log('CHANGED_JOB_GIST', 'initial state:', state, 'action', action);
            const {gist, snippet} = state;
            if (gist) {
                gist.content = action.content;
            }
            if (snippet) {
                snippet.content = action.content;
            }
            var temp = {
                ...state, 
                gist: gist, 
                snippet: snippet
            };
            console.log('CHANGED_JOB_GIST', 'final state:', temp);
            return temp;
        }
        case DELETE_JOB_GIST_REQUEST: {
            console.log('DELETE_JOB_GIST_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('DELETE_JOB_GIST_REQUEST', 'final state:', temp);
            return temp;
        }
        case DELETE_JOB_GIST_SUCCESS: {
            console.log('DELETE_JOB_GIST_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                gists: action.payload.gists, 
                fragments: action.payload.fragments, 
                contexts: action.payload.contexts, 
                snippets: action.payload.snippets, 
                isLoading: false, 
                loadingError: null
            };
            console.log('DELETE_JOB_GIST_SUCCESS', 'final state:', temp);
            return temp;
        }
        case DELETE_JOB_GIST_FAILURE: {
            console.log('DELETE_JOB_GIST_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('DELETE_JOB_GIST_FAILURE', 'final state:', temp);
            return temp;
        }
        case DUPLICATE_JOB_GIST_REQUEST: {
            console.log('DUPLICATE_JOB_GIST_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('DUPLICATE_JOB_GIST_REQUEST', 'final state:', temp);
            return temp;
        }
        case DUPLICATE_JOB_GIST_SUCCESS: {
            console.log('DUPLICATE_JOB_GIST_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                gists: action.payload.gists, 
                fragments: action.payload.fragments, 
                contexts: action.payload.contexts, 
                snippets: action.payload.snippets, 
                isLoading: false, 
                loadingError: null
            };
            console.log('DUPLICATE_JOB_GIST_SUCCESS', 'final state:', temp);
            return temp;
        }
        case DUPLICATE_JOB_GIST_FAILURE: {
            console.log('DUPLICATE_JOB_GIST_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('DUPLICATE_JOB_GIST_FAILURE', 'final state:', temp);
            return temp;
        }
        case RENAME_JOB_GIST_REQUEST: {
            console.log('RENAME_JOB_GIST_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true
            };
            console.log('RENAME_JOB_GIST_REQUEST', 'final state:', temp);
            return temp;
        }
        case RENAME_JOB_GIST_SUCCESS: {
            console.log('RENAME_JOB_GIST_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                gists: action.payload.gists, 
                fragments: action.payload.fragments, 
                contexts: action.payload.contexts, 
                snippets: action.payload.snippets, 
                isLoading: false, 
                loadingError: null
            };
            console.log('RENAME_JOB_GIST_SUCCESS', 'final state:', temp);
            return temp;
        }
        case RENAME_JOB_GIST_FAILURE: {
            console.log('RENAME_JOB_GIST_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('RENAME_JOB_GIST_FAILURE', 'final state:', temp);
            return temp;
        }
        case WIZZIFY_JOB_SNIPPET_REQUEST: {
            console.log('WIZZIFY_JOB_SNIPPET_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isWizzifying: true
            };
            console.log('WIZZIFY_JOB_SNIPPET_REQUEST', 'final state:', temp);
            return temp;
        }
        case WIZZIFY_JOB_SNIPPET_SUCCESS: {
            console.log('WIZZIFY_JOB_SNIPPET_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                wizzified: action.payload.wizzified, 
                isWizzifying: false, 
                wizzifyingError: null
            };
            console.log('WIZZIFY_JOB_SNIPPET_SUCCESS', 'final state:', temp);
            return temp;
        }
        case WIZZIFY_JOB_SNIPPET_FAILURE: {
            console.log('WIZZIFY_JOB_SNIPPET_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isWizzifying: false, 
                wizzifyingError: action.payload.error
            };
            console.log('WIZZIFY_JOB_SNIPPET_FAILURE', 'final state:', temp);
            return temp;
        }
        case CLEAR_JOB_NAVIGATIONS: {
            console.log('CLEAR_JOB_NAVIGATIONS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                toSnippet: null, 
                toGist: null, 
                toWfJob: null
            };
            console.log('CLEAR_JOB_NAVIGATIONS', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default jobReducer;
