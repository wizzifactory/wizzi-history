/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\reducers\wizzisystemreducer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import { GET_WIZZI_SYSTEM_PACKAGES, GET_WIZZI_SYSTEM_PACKAGES_REQUEST, GET_WIZZI_SYSTEM_PACKAGES_SUCCESS, GET_WIZZI_SYSTEM_PACKAGES_FAILURE } from '../actions';
// TODO Managed schemas should a data list on the server config object
const wizziSystemInitialState = {
    isLoading: false, 
    loadingError: null, 
    versions: [], 
    packages: {}
};
function wizziSystemReducer(state, action) {
    // log wizziSystemReducer, state, action
    if (typeof state === 'undefined') {
        return wizziSystemInitialState;
    }
    switch (action.type) {
        case GET_WIZZI_SYSTEM_PACKAGES_REQUEST: {
            console.log('GET_WIZZI_SYSTEM_PACKAGES_REQUEST', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                isLoading: true, 
                loadingError: null
            };
            console.log('GET_WIZZI_SYSTEM_PACKAGES_REQUEST', 'final state:', temp);
            return temp;
        }
        case GET_WIZZI_SYSTEM_PACKAGES_FAILURE: {
            console.log('GET_WIZZI_SYSTEM_PACKAGES_FAILURE', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                versions: [], 
                packages: {}, 
                isLoading: false, 
                loadingError: action.payload.error
            };
            console.log('GET_WIZZI_SYSTEM_PACKAGES_FAILURE', 'final state:', temp);
            return temp;
        }
        case GET_WIZZI_SYSTEM_PACKAGES_SUCCESS: {
            console.log('GET_WIZZI_SYSTEM_PACKAGES_SUCCESS', 'initial state:', state, 'action', action);
            var temp = {
                ...state, 
                versions: action.payload.versions, 
                packages: action.payload.packages, 
                isLoading: false, 
                loadingError: null
            };
            console.log('GET_WIZZI_SYSTEM_PACKAGES_SUCCESS', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default wizziSystemReducer;
