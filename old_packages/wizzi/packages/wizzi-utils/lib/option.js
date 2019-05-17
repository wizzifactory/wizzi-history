/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\lib\option.js.ittf
*/
'use strict';
/** -àà
     TODO eliminate this
    
*/
var data = {};
var option = module.exports = function(key, value) {
    var no = key.match(/^no-(.+)$/);
    if (arguments.length === 2) {
        return data[key] = value;
    }
    else if (no) {
        return data[no[1]] === false;
    }
    else {
        return data[key];
    }
};
option.init = function(obj) {
    return data = (obj || {});
};
