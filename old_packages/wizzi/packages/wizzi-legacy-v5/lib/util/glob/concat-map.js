/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-utils\src\ittf\lib\glob\concat-map.js.ittf
    utc time: Tue, 10 Oct 2017 15:30:05 GMT
*/
'use strict';
// FROM
// Copyright
// source: https://github.com/substack/node-concat-map/blob/master/index.js
// license (MIT)
module.exports = function(xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i)
        ;
        if (isArray(x)) {
            res.push.apply(res, x);
        }
        else {
            res.push(x);
        }
    }
    return res;
};
var isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};
