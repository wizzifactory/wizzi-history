/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\store\actions\index.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import { HTTP_REQUEST } from '../../middleware/config';

const wizzifyTypes = [
    'Js', 
    'Html', 
    'Css', 
    'Xml'
];


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
                url: '/api/wf/commons', 
                method: 'get'
            }
        };
};


const TOGGLE_THEME_SHADE = 'TOGGLE_THEME_SHADE';


// execfile
const LIST_EXECFILE = 'LIST_EXECFILE';
const LIST_EXECFILE_REQUEST = 'LIST_EXECFILE_REQUEST';
const LIST_EXECFILE_SUCCESS = 'LIST_EXECFILE_SUCCESS';
const LIST_EXECFILE_FAILURE = 'LIST_EXECFILE_FAILURE';
const RUN_EXECFILE = 'RUN_EXECFILE';
const RUN_EXECFILE_REQUEST = 'RUN_EXECFILE_REQUEST';
const RUN_EXECFILE_SUCCESS = 'RUN_EXECFILE_SUCCESS';
const RUN_EXECFILE_FAILURE = 'RUN_EXECFILE_FAILURE';

const listExecFile = (refresh) => {
    return {
            type: LIST_EXECFILE, 
            [HTTP_REQUEST]: {
                types: [
                    LIST_EXECFILE_REQUEST, 
                    LIST_EXECFILE_SUCCESS, 
                    LIST_EXECFILE_FAILURE
                ], 
                url: '/api/jobs/execfiles', 
                method: 'get', 
                queryParams: {
                    refresh: (refresh ? 'true' : 'false')
                }
            }
        };
};

const runExecFile = (name) => {
    return {
            type: RUN_EXECFILE, 
            name: name, 
            [HTTP_REQUEST]: {
                types: [
                    RUN_EXECFILE_REQUEST, 
                    RUN_EXECFILE_SUCCESS, 
                    RUN_EXECFILE_FAILURE
                ], 
                url: '/api/jobs/runexecfile', 
                method: 'get', 
                queryParams: {
                    name: name
                }
            }
        };
};


const CHANGE_VIEW = 'CHANGE_VIEW';


// console
const LIST_CONSOLE = 'LIST_CONSOLE';
const LIST_CONSOLE_REQUEST = 'LIST_CONSOLE_REQUEST';
const LIST_CONSOLE_SUCCESS = 'LIST_CONSOLE_SUCCESS';
const LIST_CONSOLE_FAILURE = 'LIST_CONSOLE_FAILURE';
const GET_CONSOLE = 'GET_CONSOLE';
const GET_CONSOLE_REQUEST = 'GET_CONSOLE_REQUEST';
const GET_CONSOLE_SUCCESS = 'GET_CONSOLE_SUCCESS';
const GET_CONSOLE_FAILURE = 'GET_CONSOLE_FAILURE';
const SAVE_CONSOLE = 'SAVE_CONSOLE';
const SAVE_CONSOLE_REQUEST = 'SAVE_CONSOLE_REQUEST';
const SAVE_CONSOLE_SUCCESS = 'SAVE_CONSOLE_SUCCESS';
const SAVE_CONSOLE_FAILURE = 'SAVE_CONSOLE_FAILURE';
const RUN_CONSOLE = 'RUN_CONSOLE';
const RUN_CONSOLE_REQUEST = 'RUN_CONSOLE_REQUEST';
const RUN_CONSOLE_SUCCESS = 'RUN_CONSOLE_SUCCESS';
const RUN_CONSOLE_FAILURE = 'RUN_CONSOLE_FAILURE';

const listConsole = (refresh) => {
    return {
            type: LIST_CONSOLE, 
            [HTTP_REQUEST]: {
                types: [
                    LIST_CONSOLE_REQUEST, 
                    LIST_CONSOLE_SUCCESS, 
                    LIST_CONSOLE_FAILURE
                ], 
                url: '/api/jobs/scripts', 
                method: 'get', 
                queryParams: {
                    refresh: (refresh ? 'true' : 'false')
                }
            }
        };
};

const getConsole = (name) => {
    return {
            type: GET_CONSOLE, 
            name: name, 
            [HTTP_REQUEST]: {
                types: [
                    GET_CONSOLE_REQUEST, 
                    GET_CONSOLE_SUCCESS, 
                    GET_CONSOLE_FAILURE
                ], 
                url: '/api/jobs/script', 
                method: 'get', 
                queryParams: {
                    name: name
                }
            }
        };
};

const saveConsole = (name, ittfContent) => {
    return {
            type: SAVE_CONSOLE, 
            name: name, 
            ittfContent: ittfContent, 
            [HTTP_REQUEST]: {
                types: [
                    SAVE_CONSOLE_REQUEST, 
                    SAVE_CONSOLE_SUCCESS, 
                    SAVE_CONSOLE_FAILURE
                ], 
                url: '/api/jobs/script', 
                method: 'post', 
                payload: {
                    name: name, 
                    content: ittfContent
                }
            }
        };
};

const runConsole = (name) => {
    return {
            type: RUN_CONSOLE, 
            name: name, 
            [HTTP_REQUEST]: {
                types: [
                    RUN_CONSOLE_REQUEST, 
                    RUN_CONSOLE_SUCCESS, 
                    RUN_CONSOLE_FAILURE
                ], 
                url: '/api/jobs/runscript', 
                method: 'get', 
                queryParams: {
                    name: name
                }
            }
        };
};

const changeView = (viewName) => {
    return {
            type: CHANGE_VIEW, 
            view: viewName
        };
};


// wizzify
const JS_WIZZIFY = 'JS_WIZZIFY';
const JS_WIZZIFY_REQUEST = 'JS_WIZZIFY_REQUEST';
const JS_WIZZIFY_SUCCESS = 'JS_WIZZIFY_SUCCESS';
const JS_WIZZIFY_FAILURE = 'JS_WIZZIFY_FAILURE';
const HTML_WIZZIFY = 'HTML_WIZZIFY';
const HTML_WIZZIFY_REQUEST = 'HTML_WIZZIFY_REQUEST';
const HTML_WIZZIFY_SUCCESS = 'HTML_WIZZIFY_SUCCESS';
const HTML_WIZZIFY_FAILURE = 'HTML_WIZZIFY_FAILURE';
const CSS_WIZZIFY = 'CSS_WIZZIFY';
const CSS_WIZZIFY_REQUEST = 'CSS_WIZZIFY_REQUEST';
const CSS_WIZZIFY_SUCCESS = 'CSS_WIZZIFY_SUCCESS';
const CSS_WIZZIFY_FAILURE = 'CSS_WIZZIFY_FAILURE';
const XML_WIZZIFY = 'XML_WIZZIFY';
const XML_WIZZIFY_REQUEST = 'XML_WIZZIFY_REQUEST';
const XML_WIZZIFY_SUCCESS = 'XML_WIZZIFY_SUCCESS';
const XML_WIZZIFY_FAILURE = 'XML_WIZZIFY_FAILURE';

const jsWizzify = (source, checked) => {
    return {
            type: JS_WIZZIFY, 
            source: source, 
            checked: checked || false, 
            [HTTP_REQUEST]: {
                types: [
                    JS_WIZZIFY_REQUEST, 
                    JS_WIZZIFY_SUCCESS, 
                    JS_WIZZIFY_FAILURE
                ], 
                url: '/api/wf/jswizzify', 
                method: 'post', 
                payload: {
                    source: source, 
                    checked: checked || false
                }
            }
        };
};

const htmlWizzify = (source) => {
    return {
            type: HTML_WIZZIFY, 
            source: source, 
            [HTTP_REQUEST]: {
                types: [
                    HTML_WIZZIFY_REQUEST, 
                    HTML_WIZZIFY_SUCCESS, 
                    HTML_WIZZIFY_FAILURE
                ], 
                url: '/api/wf/htmlwizzify', 
                method: 'post', 
                payload: {
                    source: source
                }
            }
        };
};

const cssWizzify = (source) => {
    return {
            type: CSS_WIZZIFY, 
            source: source, 
            [HTTP_REQUEST]: {
                types: [
                    CSS_WIZZIFY_REQUEST, 
                    CSS_WIZZIFY_SUCCESS, 
                    CSS_WIZZIFY_FAILURE
                ], 
                url: '/api/wf/csswizzify', 
                method: 'post', 
                payload: {
                    source: source
                }
            }
        };
};

const xmlWizzify = (source) => {
    return {
            type: XML_WIZZIFY, 
            source: source, 
            checked: checked || false, 
            [HTTP_REQUEST]: {
                types: [
                    XML_WIZZIFY_REQUEST, 
                    XML_WIZZIFY_SUCCESS, 
                    XML_WIZZIFY_FAILURE
                ], 
                url: '/api/wf/xmlwizzify', 
                method: 'post', 
                payload: {
                    source: source
                }
            }
        };
};


module.exports = {
    wizzifyTypes: wizzifyTypes,
    INITIAL_LOAD: INITIAL_LOAD,
    INITIAL_LOAD_REQUEST: INITIAL_LOAD_REQUEST,
    INITIAL_LOAD_SUCCESS: INITIAL_LOAD_SUCCESS,
    INITIAL_LOAD_FAILURE: INITIAL_LOAD_FAILURE,
    initialLoad: initialLoad,
    TOGGLE_THEME_SHADE: TOGGLE_THEME_SHADE,
    LIST_EXECFILE: LIST_EXECFILE,
    LIST_EXECFILE_REQUEST: LIST_EXECFILE_REQUEST,
    LIST_EXECFILE_SUCCESS: LIST_EXECFILE_SUCCESS,
    LIST_EXECFILE_FAILURE: LIST_EXECFILE_FAILURE,
    RUN_EXECFILE: RUN_EXECFILE,
    RUN_EXECFILE_REQUEST: RUN_EXECFILE_REQUEST,
    RUN_EXECFILE_SUCCESS: RUN_EXECFILE_SUCCESS,
    RUN_EXECFILE_FAILURE: RUN_EXECFILE_FAILURE,
    listExecFile: listExecFile,
    runExecFile: runExecFile,
    CHANGE_VIEW: CHANGE_VIEW,
    LIST_CONSOLE: LIST_CONSOLE,
    LIST_CONSOLE_REQUEST: LIST_CONSOLE_REQUEST,
    LIST_CONSOLE_SUCCESS: LIST_CONSOLE_SUCCESS,
    LIST_CONSOLE_FAILURE: LIST_CONSOLE_FAILURE,
    GET_CONSOLE: GET_CONSOLE,
    GET_CONSOLE_REQUEST: GET_CONSOLE_REQUEST,
    GET_CONSOLE_SUCCESS: GET_CONSOLE_SUCCESS,
    GET_CONSOLE_FAILURE: GET_CONSOLE_FAILURE,
    SAVE_CONSOLE: SAVE_CONSOLE,
    SAVE_CONSOLE_REQUEST: SAVE_CONSOLE_REQUEST,
    SAVE_CONSOLE_SUCCESS: SAVE_CONSOLE_SUCCESS,
    SAVE_CONSOLE_FAILURE: SAVE_CONSOLE_FAILURE,
    RUN_CONSOLE: RUN_CONSOLE,
    RUN_CONSOLE_REQUEST: RUN_CONSOLE_REQUEST,
    RUN_CONSOLE_SUCCESS: RUN_CONSOLE_SUCCESS,
    RUN_CONSOLE_FAILURE: RUN_CONSOLE_FAILURE,
    listConsole: listConsole,
    getConsole: getConsole,
    saveConsole: saveConsole,
    runConsole: runConsole,
    changeView: changeView,
    JS_WIZZIFY: JS_WIZZIFY,
    JS_WIZZIFY_REQUEST: JS_WIZZIFY_REQUEST,
    JS_WIZZIFY_SUCCESS: JS_WIZZIFY_SUCCESS,
    JS_WIZZIFY_FAILURE: JS_WIZZIFY_FAILURE,
    HTML_WIZZIFY: HTML_WIZZIFY,
    HTML_WIZZIFY_REQUEST: HTML_WIZZIFY_REQUEST,
    HTML_WIZZIFY_SUCCESS: HTML_WIZZIFY_SUCCESS,
    HTML_WIZZIFY_FAILURE: HTML_WIZZIFY_FAILURE,
    CSS_WIZZIFY: CSS_WIZZIFY,
    CSS_WIZZIFY_REQUEST: CSS_WIZZIFY_REQUEST,
    CSS_WIZZIFY_SUCCESS: CSS_WIZZIFY_SUCCESS,
    CSS_WIZZIFY_FAILURE: CSS_WIZZIFY_FAILURE,
    XML_WIZZIFY: XML_WIZZIFY,
    XML_WIZZIFY_REQUEST: XML_WIZZIFY_REQUEST,
    XML_WIZZIFY_SUCCESS: XML_WIZZIFY_SUCCESS,
    XML_WIZZIFY_FAILURE: XML_WIZZIFY_FAILURE,
    jsWizzify: jsWizzify,
    htmlWizzify: htmlWizzify,
    cssWizzify: cssWizzify,
    xmlWizzify: xmlWizzify
};
