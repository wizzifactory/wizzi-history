/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\lib\jswizzi\functions\underscore.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('../../util/verify');
var inflect = require('i')(true);
module.exports = {
    pluralize: function (str) {
        return inflect.pluralize(str);
    },
    capitalize: function (str) {
        return str.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    },
    camelize: function (str) {
        return inflect.camelize(str, false);
    },
    dashToCamelCase: function (str) {
        return verify.dashToCamelCase(str);
    },
    escape: function (value) {
        if (verify.isNotEmpty(value)) {
            return verify.replaceAll(verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"'), "'", "\\'");
        }
        else {
            return value;
        }
    },
    isEmpty: function (text) {
        return typeof text === 'string' && text.trim().length === 0;
    },
    isNotEmpty: function (text) {
        return typeof text === 'string' && text.trim().length > 0;
    },
    isObject: function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    },
    isArray: function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        }
        else {
            return toString.call(obj) === '[object Array]';
        }
    },
    isString: function (obj) {
        return toString.call(obj) === '[object String]';
    },
    isNumber: function (obj) {
        return toString.call(obj) === '[object Number]';
    },
    isDate: function (obj) {
        return toString.call(obj) === '[object Date]';
    },
    isFunction: function (obj) {
        return toString.call(obj) === '[object Function]';
    },
    deinline: function (text) {
        if (this.isNotEmpty(text) == false) {
            return '';
        }
        var len = text.length,
            ch,
            i,
            ret = [];
        for (i = 0; i < len; i++) {
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
    log: function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.splice(0, 0, "=== jsWizzi:log => ");
        console.log.apply(null, args);
    },
    inspect: function (obj) {
        return util.inspect(obj, { depth: null });
    },
    replace: function (text, from, to) {
        return verify.replaceAll(text, from, to);
    }
};
