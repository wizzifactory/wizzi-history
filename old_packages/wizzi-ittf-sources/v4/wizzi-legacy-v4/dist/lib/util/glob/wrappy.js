/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-utils\src\ittf\lib\glob\wrappy.js.ittf
    utc time: Tue, 10 Oct 2017 15:30:05 GMT
*/
'use strict';
// FROM
// Copyright (c) Isaac Z. Schlueter and Contributors
// source https://github.com/npm/wrappy/blob/master/wrappy.js
// license (ISC)
module.exports = wrappy;
function wrappy(fn, cb) {
    if (fn && cb) {
        return wrappy(fn)(cb)
            
        ;
    }
    if (typeof(fn) !== 'function') {
        throw new TypeError('need wrapper function');
    }
    Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
    })
    ;
    return wrapper;
    function wrapper() {
        var ret = fn.apply(this, arguments);
        var cb = arguments[(arguments.length - 1)];
        if (typeof (ret) === 'function' && ret !== cb) {
            Object.keys(cb).forEach(function(k) {
                ret[k] = cb[k];
            })
            ;
        }
        return ret;
    }
}
