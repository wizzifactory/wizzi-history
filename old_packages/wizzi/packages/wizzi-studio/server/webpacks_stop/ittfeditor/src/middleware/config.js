/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\middleware\config.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
const HTTP_REQUEST = 'HTTP_REQUEST';
const defaultTimeout = 20000;
const defaultResponseType = 'json';
import { documents } from './schemas';
console.log('documents', documents);
const Schemas = {
    documents: documents
};

module.exports = {
    HTTP_REQUEST: HTTP_REQUEST,
    defaultTimeout: defaultTimeout,
    defaultResponseType: defaultResponseType,
    Schemas: Schemas
};
