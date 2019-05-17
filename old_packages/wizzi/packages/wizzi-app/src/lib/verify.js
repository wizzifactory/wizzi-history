/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\lib\verify.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
var util = require('util');
var md = module.exports = {};
var isAbsolutePathRegExp = new RegExp('^(?:[a-z]+:)?/', 'i');
md.isDefined = function(test) {
    return !(typeof(test) === 'undefined');
};
md.isUndefined = function(test) {
    return typeof(test) === 'undefined';
};
md.isNullOrUndefined = function(test) {
    return test === null || (typeof(test) === 'undefined');
};
md.isString = function(test) {
    return test !== null && typeof(test) === 'string';
};
md.isEmpty = function(test) {
    return md.isString(test) == false || test.length == 0;
};
md.isNotEmpty = function(test) {
    return md.isString(test) && test.length > 0;
};
md.isNumber = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return !md.isArray(test) && (test - parseFloat(test) + 1) >= 0;
};
md.isBoolean = function(test) {
    return typeof(test) === 'boolean';
};
md.isDate = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return Object.prototype.toString.call(test) === '[object Date]';
};
md.isPrimitive = function(test) {
    return md.isString(test) || md.isNumber(test) || md.isBoolean(test) || md.isDate(test);
};
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
    if (Array.isArray) {
        return Array.isArray(test);
    }
    return {}.toString.call(test) === '[object Array]';
};
md.isFunction = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return {}.toString.call(test) === '[object Function]';
};
md.isRegExp = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return {}.toString.call(test) === '[object RegExp]';
};
md.isError = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return ({}.toString.call(test) === '[object Error]') || (test instanceof Error);
};
md.isAbsolutePath = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return isAbsolutePathRegExp.test(md.unixifyPath(test));
    /**
        if (test.substr(0,3) === 'db:' || test.substr(0,3) === 'ls:') {
            return true;
        }
        return path.resolve(test) == path.normalize(test);
    */
};
md.isIttfMacro = function(test) {
    if (md.isEmpty(test)) {
        return false;
    }
    test = test.trim();
    return test.substr(0, 2) === ' && test.substr(-1, 1) === ';
};
md.isSingleQuoteLiteral = function(test) {
    if (md.isEmpty(test)) {
        return false;
    }
    test = test.trim();
    return test[0] === "'" && test.substr(-1, 1) === "'";
};
md.isDoubleQuoteLiteral = function(test) {
    if (md.isEmpty(test)) {
        return false;
    }
    test = test.trim();
    return test[0] === '"' && test.substr(-1, 1) === '"';
};
md.isCssLength = function(test) {
    if (md.isEmpty(test)) {
        return false;
    }
    test = test.trim();
    var num = 0;
    var unit = '';
    for (var i=0; i<test.length; i++) {
        if ('0123456789.'.indexOf(test[i]) > -1) {
            num++;
        }
        else {
            unit += test[i];
        }
    }
    return num > 0 && ['px', 'em', 'rem', 'vh', 'vw'].indexOf(unit) > -1;
};
md.replaceAll = function(text, find, replace) {
    if (md.isEmpty(text)) {
        return text;
    }
    // log 'replaceAll', text, find, replace
    return text.replace(new RegExp(md.escapeRegExp(find), 'g'), replace);
};
md.escapeRegExp = function(text) {
    if (md.isEmpty(text)) {
        return text;
    }
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};
