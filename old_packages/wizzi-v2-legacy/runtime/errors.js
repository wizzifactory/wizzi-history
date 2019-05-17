/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\runtime\errors.js.ittf
    utc time: Tue, 11 Jul 2017 18:49:57 GMT
*/
'use strict';
var util = require('util');

var md = module.exports = {};

function RunnerServerError(message) {
    this.name = 'RunnerServerError';
    console.log('message', message);
    this.message = message;
    this.stack = (new Error()).stack;
}

RunnerServerError.prototype.toString = function() {
    return this.message;
};
RunnerServerError.prototype = Object.create(Error.prototype);
RunnerServerError.prototype.constructor = RunnerServerError;
md.RunnerServerError = RunnerServerError;


