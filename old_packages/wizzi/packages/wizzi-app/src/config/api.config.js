/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\config\api.config.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
const HTTP_REQUEST = 'HTTP_REQUEST';
const defaultTimeout = 20000;
const defaultResponseType = 'json';
var apiServer = null;
apiServer = {
    https: false, 
    host: 'localhost', 
    port: 3014
};
const server = apiServer;

module.exports = {
    HTTP_REQUEST: HTTP_REQUEST,
    defaultTimeout: defaultTimeout,
    defaultResponseType: defaultResponseType,
    server: server
};
