/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\store\reducers\commonsreducer.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';

import { GET_COMMONS_SUCCESS } from '../actions';

const commonsInitialState = {
    items: []
};

function commonsReducer(state, action) {
    // log 'commonsReducer', state, action
    if (typeof state === 'undefined') {
        return commonsInitialState;
    }
    switch (action.type) {
        case GET_COMMONS_SUCCESS: {
            // log 'GET_COMMONS_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                items: Object.values(action.payload.items)
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
