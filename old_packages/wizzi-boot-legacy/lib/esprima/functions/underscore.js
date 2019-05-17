// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:42 GMT
'use strict';
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
    }
};
