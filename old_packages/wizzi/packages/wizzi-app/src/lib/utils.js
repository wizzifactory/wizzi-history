/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\lib\utils.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
function errorUtil(source) {
    return function(message, method) {
            return {
                    __is_error: true, 
                    message: message, 
                    source: source + '/' + method
                };
        };
}
function throwErrorUtil(source) {
    var errorBuilder = errorUtil(source);
    return function(message, method) {
            message = errorBuilder(message, method);
            console.log(message);
            throw new Error(message);
        };
}

module.exports = {
    errorUtil: errorUtil,
    throwErrorUtil: throwErrorUtil
};
