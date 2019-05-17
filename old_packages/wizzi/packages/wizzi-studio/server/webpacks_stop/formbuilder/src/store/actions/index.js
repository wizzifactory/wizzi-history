/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\store\actions\index.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';



// load
const INITIAL_LOAD = 'INITIAL_LOAD';
const INITIAL_LOAD_REQUEST = 'INITIAL_LOAD_REQUEST';
const INITIAL_LOAD_SUCCESS = 'INITIAL_LOAD_SUCCESS';
const INITIAL_LOAD_FAILURE = 'INITIAL_LOAD_FAILURE';

const initialLoad = () => {
    return {
            type: INITIAL_LOAD, 
            [HTTP_REQUEST]: {
                types: [
                    INITIAL_LOAD_REQUEST, 
                    INITIAL_LOAD_SUCCESS, 
                    INITIAL_LOAD_FAILURE
                ], 
                url: '/api/cssplay/commons', 
                method: 'get'
            }
        };
};


const TOGGLE_THEME_SHADE = 'TOGGLE_THEME_SHADE';

module.exports = {
    INITIAL_LOAD: INITIAL_LOAD,
    INITIAL_LOAD_REQUEST: INITIAL_LOAD_REQUEST,
    INITIAL_LOAD_SUCCESS: INITIAL_LOAD_SUCCESS,
    INITIAL_LOAD_FAILURE: INITIAL_LOAD_FAILURE,
    initialLoad: initialLoad,
    TOGGLE_THEME_SHADE: TOGGLE_THEME_SHADE
};
