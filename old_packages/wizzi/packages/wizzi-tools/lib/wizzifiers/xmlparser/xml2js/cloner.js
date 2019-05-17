/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-tools-next\src\ittf\lib\wizzifiers\xmlparser\xml2js\cloner.js.ittf
    utc time: Mon, 30 Jul 2018 13:28:47 GMT
*/
'use strict';
var verify = require('wizzi-utils').verify;
function clone(obj) {
    if (verify.isArray(obj)) {
        var ret = [];
        var i, i_items=obj, i_len=obj.length, item;
        for (i=0; i<i_len; i++) {
            item = obj[i];
            var value = clone(item);
            if (value !== null) {
                ret.push(value);
            }
        }
        return ret;
    }
    else if (verify.isObject(obj)) {
        var ret = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                ret[prop] = clone(obj[prop]);
            }
        }
        return ret;
    }
    else {
        return obj;
    }
}
module.exports = function(ast) {
    return clone(ast);
};
