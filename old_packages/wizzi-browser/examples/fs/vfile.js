/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\fs\vfile.js.ittf
*/
'use strict';
var path = require('path');
var del = require('del');
var vfile = require('../../lib/fs/vfile');
var file = vfile();
del.sync(path.join(__dirname, 'ittf', '**', '*.*'));
file.write(path.join(__dirname, 'ittf', 't', 'alpha.tests.ittf'), 'tests makepath', function(err, result) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('result', result);
});
file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_1.ittf'), 'globbed 1');
file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_2.ittf'), 'globbed 2');
var result = file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'));
console.log('vfile.result', result);
var result = file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), {
    removeRoot: path.join(__dirname, 'ittf')
});
console.log('vfile.result', result);
