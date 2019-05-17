/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\store\reducers\commonsreducer.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';

import { GET_COMMONS_SUCCESS } from '../actions';

const commonsInitialState = {
    projects: [], 
    packages: [], 
    schemas: []
};

function commonsReducer(state, action) {
    // log commonsReducer, state, action
    if (typeof state === 'undefined') {
        return commonsInitialState;
    }
    switch (action.type) {
        case GET_COMMONS_SUCCESS: {
            // log 'GET_COMMONS_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                packages: Object.values(action.payload.packages), 
                projects: Object.values(action.payload.projects), 
                schemas: Object.values(action.payload.schemas)
            };
            console.log('GET_COMMONS_SUCCESS', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default commonsReducer;
