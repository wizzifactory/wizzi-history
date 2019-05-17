/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\lib\glob\concat-map.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:07 GMT
*/
'use strict';
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
var isArray = Array.isArray || (function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
});
