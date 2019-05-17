/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\jswizzi\functions\underscore.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var util = require('util');
var verify = require('../../util/verify');
var inflect = require('i');
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
        })
    ;
};
String.prototype.pluralize = function() {
    return inflect.pluralize(this);
};
module.exports = {
    pluralize: function(str) {
        return inflect.pluralize(str);
    }, 
    capitalize: function(str) {
        return str.replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase();
            })
        ;
    }, 
    dashToCamelCase: function(str) {
        return verify.dashToCamelCase(str);
    }, 
    escape: verify.escapename, 
    isEmpty: function(text) {
        return typeof text === 'string' && text.trim().length === 0;
    }, 
    isNotEmpty: function(text) {
        return typeof text === 'string' && text.trim().length > 0;
    }, 
    isObject: function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }, 
    isArray: function(obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        }
        else {
            return toString.call(obj) === '[object Array]';
        }
    }, 
    isString: function(obj) {
        return toString.call(obj) === '[object String]';
    }, 
    isNumber: function(obj) {
        return toString.call(obj) === '[object Number]';
    }, 
    isDate: function(obj) {
        return toString.call(obj) === '[object Date]';
    }, 
    isFunction: function(obj) {
        return toString.call(obj) === '[object Function]';
    }, 
    isUndefined: function(obj) {
        return obj === void 0;
    }, 
    deinline: function(text) {
        if (this.isNotEmpty(text) == false) {
            return '';
        }
        var len = text.length,
            ch,
            i,
            ret = [];
        for (i=0; i<len; i++) {
            ch = text[i];
            if (ch === '¥') {
                ret.push('\n');
            }
            else if (ch === '┐') {
                ret.push('\r');
            }
            else if (ch === '└') {
                ret.push('$');
            }
            else if (ch === '\t') {
                ret.push('    ');
            }
            else {
                ret.push(ch);
            }
        }
        return ret.join('');
    }, 
    log: function() {
        var args = Array.prototype.slice.call(arguments, 0)
        ;
        args.splice(0, 0, "=== jsWizzi:log => ");
        console.log.apply(null, args);
    }, 
    inspect: function(obj) {
        return util.inspect(obj, { depth: null});
    }
};
