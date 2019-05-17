/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-repo\src\ittf\lib\utils\errors.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};

function RepoCollectionError(message) {
    this.name = 'RepoCollectionError';
    console.log('message', message);
    this.message = message;
    // 5/8/17 set this.stack = (new Error()).stack
}
RepoCollectionError.prototype.toString = function() {
    return this.message;
};
RepoCollectionError.prototype = Object.create(Error.prototype);
RepoCollectionError.prototype.constructor = RepoCollectionError;
md.RepoCollectionError = RepoCollectionError;

