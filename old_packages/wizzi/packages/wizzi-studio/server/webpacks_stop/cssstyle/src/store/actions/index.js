/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\store\actions\index.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';
import { HTTP_REQUEST } from '../../middleware/config';



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
