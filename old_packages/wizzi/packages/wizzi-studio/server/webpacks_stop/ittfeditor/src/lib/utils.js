/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\lib\utils.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';

import _ from 'lodash';

function notEmptyString(text) {
    return _.isString(text) && text.length > 0;
}
function error(source) {
    return function(message, method) {
            return {
                    __is_error: true, 
                    message: message, 
                    source: source + '/' + method
                };
        };
}
function throwError(source) {
    var errorBuilder = error(source);
    return function(message, method) {
            message = errorBuilder(message, method);
            console.log(message);
            throw new Error(message);
        };
}

module.exports = {
    notEmptyString: notEmptyString,
    error: error,
    throwError: throwError
};
