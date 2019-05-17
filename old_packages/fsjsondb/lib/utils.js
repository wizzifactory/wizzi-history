// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Wed, 01 Feb 2017 14:56:33 GMT
'use strict';
var fs = require('fs');
var path = require('path');
var UTILS = {
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
    isUndefined: function(obj) {
        return obj === void 0;
    }, 
    keys: function(obj) {
        if (!UTILS.isObject(obj)) {
            return [];
        }
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                keys.push(key);
            }
        }
        return keys;
    }, 
    objkeyToString: function(objkey) {
        return JSON.stringify(objkey, null, 0);
    }, 
    extractKey: function(keyNames,obj) {
        if (obj._id) {
            return {
                    id: obj._id
                };
        }
        else {
            var objkey = {};
            var i, i_len=keyNames.length, keyname;
            for (i=0; i<i_len; i++) {
                keyname = keyNames[i];
                objkey[keyname] = obj[keyname];
            }
            return objkey;
        }
    }, 
    isValidPath: function(path,callback) {
        fs.stat(path, function(err,stat) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }
};
var names = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'];
var i, i_len=names.length, name;
for (i=0; i<i_len; i++) {
    name = names[i];
    UTILS['is' + name] = function(obj) {
        return toString.call(obj) === '[object ' + name + ']';
    };
}
module.exports = UTILS;
