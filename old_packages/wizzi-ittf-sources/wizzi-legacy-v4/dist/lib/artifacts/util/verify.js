/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-html\src\ittf\lib\artifacts\util\verify.js.ittf
    utc time: Wed, 11 Oct 2017 11:41:46 GMT
*/
'use strict';

var md = module.exports = {};
md.isObject = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return {}.toString.call(test) === '[object Object]';
};
md.isArray = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return {}.toString.call(test) === '[object Array]';
};
md.isNumber = function(test) {
    return !md.isArray(test) && (test - parseFloat(test) + 1) >= 0;
};
md.isFunction = function(functionToCheck) {
    if (functionToCheck === null || typeof(functionToCheck) === 'undefined') {
        return false;
    }
    return {}.toString.call(functionToCheck) === '[object Function]';
};
md.isString = function(test) {
    return test !== null && typeof(test) === 'string';
};
md.isEmpty = function(test) {
    return test == null || typeof(test) !== 'string' || test.length == 0;
};
md.isNotEmpty = function(test) {
    return test != null && typeof(test) === 'string' && test.length > 0;
};
md.startsWith = function(str, prefix) {
    if (md.isEmpty(str) || md.isEmpty(prefix)) {
        return false;
    }
    else {
        return str.indexOf(prefix) === 0;
    }
};
md.endsWith = function(str, suffix) {
    if (md.isEmpty(str) || md.isEmpty(suffix)) {
        return false;
    }
    else {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
};
md.unquote = function(str) {
    if (md.isString(str) === false) {
        return str;
    }
    if (str.length < 2) {
        return str;
    }
    if ((str.substr(0, 1) === "'" && str.substr(-1, 1) === "'") || (str.substr(0, 1) === "\"" && str.substr(-1, 1) === "\"")) {
        return str.substr(1, str.length -2);
    }
    else {
        return str;
    }
};
md.replaceAll = function(text, find, replace) {
    if (md.isEmpty(text)) {
        return text;
    }
    return text.replace(new RegExp(escapeRegExp(find), 'g'), replace)
    ;
};
function escapeRegExp(text) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
