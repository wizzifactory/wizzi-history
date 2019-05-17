/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\utils\glob.js.ittf
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
var glob = require('../../lib/glob');
var file = vfile();


file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_1.ittf'), 'globbed 1');
file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_2.ittf'), 'globbed 2');
glob(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), file, function(err, result) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('result', result);
});
var result = glob(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), file, {
    sync: true
});
console.log('result', result);
