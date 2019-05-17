/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\asisloader\index.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var file = require('../../lib/fs/file');
var vfile = require('../../lib/fs/vfile');
var fsGit = require('../../lib/fs/fsGit');
var verify = require('../../lib/verify');
var lorem = require('../../lib/lorem');
var encdec = require('../../lib/crypto/encdec');


var vfile = require('../../lib/fs/vfile');
var asIsLoader = require('../../lib/ittfTree/asIsLoader');
vfile(function(err, file) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('example.asIsLoader file', file);
    step_1(file);
});
function step_1(file) {
    asIsLoader.createFromString([
        'module', 
        '    kind react', 
        '    react Hello', 
        '        state', 
        '            @ name "stefi"'
    ].join('\n'), {
        clean: true
    }, function(err, tree) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('step_1.tree', tree);
        file.write(path.join(__dirname, 'result', 'basic.sample.clean.json'), stringify(tree, null, 2));
        step_2(file);
    });
}
function step_2(file) {
    asIsLoader.createFromString([
        'module', 
        '    kind react', 
        '    react Hello', 
        '        state', 
        '            @ name "stefi"'
    ].join('\n'), {
        clean_remove: true
    }, function(err, tree) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('step_2.tree', tree);
        file.write(path.join(__dirname, 'result', 'basic.sample.clean_remove.json'), stringify(tree, null, 2));
        step_3(file);
    });
}
function step_3(file) {
    asIsLoader(path.join(__dirname, 'ittf', 'root.sample.ittf'), {
        clean_remove: true, 
        file: file
    }, function(err, tree) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('step_3.tree', tree);
        file.write(path.join(__dirname, 'result', 'basic.sample.clean_remove.json'), stringify(tree, null, 2));
    });
}
