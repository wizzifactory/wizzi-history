// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:43 GMT
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

