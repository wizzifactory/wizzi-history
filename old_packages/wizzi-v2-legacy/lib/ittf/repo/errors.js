/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\repo\errors.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var globalErrors = require('../../errors');
var utils = require('./utils');

var md = module.exports = globalErrors;

function RepoIOError(message,uri,innerEx) {
    this.name = 'RepoIOError';
    this.message = message + '\nuri: ' + uri;
    this.stack = (new Error()).stack;
}

RepoIOError.prototype.toString = function() {
    return this.message;
};
RepoIOError.prototype = Object.create(Error.prototype);
RepoIOError.prototype.constructor = RepoIOError;
md.RepoIOError = RepoIOError;

