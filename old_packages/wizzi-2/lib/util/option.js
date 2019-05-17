/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\util\option.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var data = {};
var option = module.exports = function(key,value) {
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
