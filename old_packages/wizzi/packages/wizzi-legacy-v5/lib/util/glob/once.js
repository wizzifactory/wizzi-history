/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-utils\src\ittf\lib\glob\once.js.ittf
    utc time: Tue, 10 Oct 2017 15:30:05 GMT
*/
'use strict';
// FROM
// Copyright (c) Isaac Z. Schlueter and Contributors
// source https://github.com/isaacs/once/blob/master/once.js
// license (ISC)
var wrappy = require('./wrappy');
module.exports = wrappy(once);
module.exports.strict = wrappy(onceStrict);
once.proto = once(function() {
    Object.defineProperty(Function.prototype, 'once', {
        value: function() {
            return once(this);
        }, 
        configurable: true
    });
    Object.defineProperty(Function.prototype, 'onceStrict', {
        value: function() {
            return onceStrict(this);
        }, 
        configurable: true
    });
})
;
function once(fn) {
    var f = function() {
        if (f.called) {
            return f.value;
        }
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
}
function onceStrict(fn) {
    var f = function() {
        if (f.called) {
            throw new Error(f.onceError);
        }
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    var name = (fn.name || 'Function wrapped with `once`');
    f.onceError = (name + " shouldn't be called more than once");
    f.called = false;
    return f;
}
