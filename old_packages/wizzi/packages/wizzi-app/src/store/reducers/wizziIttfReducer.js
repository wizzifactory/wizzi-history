/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\wizziittfreducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { GET_ITTF, GET_ITTF_REQUEST, GET_ITTF_SUCCESS, GET_ITTF_FAILURE } from '../actions';
import { GET_MTREE_DEBUGINFO, GET_MTREE_DEBUGINFO_REQUEST, GET_MTREE_DEBUGINFO_SUCCESS, GET_MTREE_DEBUGINFO_FAILURE } from '../actions';
import { GEN_DEFAULT_ARTIFACT, GEN_DEFAULT_ARTIFACT_REQUEST, GEN_DEFAULT_ARTIFACT_SUCCESS, GEN_DEFAULT_ARTIFACT_FAILURE } from '../actions';
import {GET_REPO_DOCUMENT_REQUEST} from '../actions';
const wizziIttfInitialState = {
    ittfDocument: null, 
    mTreeScript: null, 
    generatedArtifact: null, 
    loadError: null
};
function wizziIttfReducer(state, action) {
    // log wizziIttfReducer, state, action
    if (typeof state === 'undefined') {
        return wizziIttfInitialState;
    }
    switch (action.type) {
        case GET_ITTF_SUCCESS: {
            console.log('GET_ITTF_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                ittfDocument: action.payload.content, 
                mTreeScript: null, 
                generatedArtifact: null, 
                loadError: null
            };
            console.log('GET_ITTF_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_ITTF_FAILURE: {
            console.log('GET_ITTF_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                ittfDocument: null, 
                loadError: action.payload.error
            };
            console.log('GET_ITTF_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_MTREE_DEBUGINFO_SUCCESS: {
            console.log('GET_MTREE_DEBUGINFO_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                mTreeScript: action.payload.mTreeBuildUpScript, 
                loadError: null
            };
            console.log('GET_MTREE_DEBUGINFO_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GET_MTREE_DEBUGINFO_FAILURE: {
            console.log('GET_MTREE_DEBUGINFO_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                mTreeScript: null, 
                loadError: action.payload.error
            };
            console.log('GET_MTREE_DEBUGINFO_FAILURE', 'final state:', temp);
            return temp;
        }
        case GEN_DEFAULT_ARTIFACT_SUCCESS: {
            console.log('GEN_DEFAULT_ARTIFACT_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generatedArtifact: action.payload.data, 
                loadError: null
            };
            console.log('GEN_DEFAULT_ARTIFACT_SUCCESS', 'final state:', temp);
            return temp;
        }
        case GEN_DEFAULT_ARTIFACT_FAILURE: {
            console.log('GEN_DEFAULT_ARTIFACT_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                generatedArtifact: null, 
                loadError: action.payload.error
            };
            console.log('GEN_DEFAULT_ARTIFACT_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_REPO_DOCUMENT_REQUEST: {
            console.log('GET_REPO_DOCUMENT_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                mTreeScript: null, 
                generatedArtifact: null
            };
            console.log('GET_REPO_DOCUMENT_REQUEST', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default wizziIttfReducer;
