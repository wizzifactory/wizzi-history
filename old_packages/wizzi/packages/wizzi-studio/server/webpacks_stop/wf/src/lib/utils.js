/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\lib\utils.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';

import isString from 'lodash/isString';

function notEmptyString(text) {
    return isString(text) && text.length > 0;
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
            message = errorBuilder(message, method)
            ;
            console.log(message);
            throw new Error(message);
        };
}

module.exports = {
    notEmptyString: notEmptyString,
    error: error,
    throwError: throwError
};
