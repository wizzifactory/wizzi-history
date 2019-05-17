/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\store\reducers\themereducer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import { TOGGLE_THEME_SHADE } from '../actions';

const themeInitialState = {
    dark: false
};

function themeReducer(state, action) {
    // log themeReducer, state, action
    if (typeof state === 'undefined') {
        return themeInitialState;
    }
    switch (action.type) {
        case TOGGLE_THEME_SHADE: {
            // log 'TOGGLE_THEME_SHADE', 'initial state:', state
            var temp = {
                ...state, 
                dark: !state.dark
            };
            console.log('TOGGLE_THEME_SHADE', 'final state:', temp);
            return temp;
        }
        default: {
            return state;
        }
    }
}
export default themeReducer;
