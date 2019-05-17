/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\utils\vfile.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var file = require('../../lib/fs/file');
var vfile = require('../../lib/fs/vfile');
var verify = require('../../lib/verify');
var lorem = require('../../lib/lorem');
var encdec = require('../../lib/crypto/encdec');
var vfile = require('../../lib/vfile');
var file = vfile();


file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_1.ittf'), 'globbed 1');
file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_2.ittf'), 'globbed 2');
var result = file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'));
console.log('vfile.result', result);
var result = file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), {
    removeRoot: path.join(__dirname, 'ittf')
});
console.log('vfile.result', result);
