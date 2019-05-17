/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\ittftree\index.js.ittf
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


var IttfFinder = require('../../lib/ittfTree/ittfFinder');
var ittfMTreeEx = require('../../lib/ittfTree/ittfMTreeEx');
console.log('wizzi-utils.examples.ittfTree');
step_4();
// _ ittfFinder_step_1
function step_1() {
    ittfMTreeEx.createFrom(path.join(__dirname, 'ittf', 'basic.sample.ittf'), {}, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        file.write(path.join(__dirname, 'ittf', 'basic.sample.json'), stringify(result, null, 2));
        step_2();
    });
}
function step_2() {
    ittfMTreeEx.createFrom([
        'module', 
        '    kind react', 
        '    react Hello', 
        '        state', 
        '            @ name "stefi"'
    ].join('\n'), {
        fromString: true, 
        clean: true
    }, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('result.findByRow(3). should be react node.', result.findByRow(3));
        file.write(path.join(__dirname, 'ittf', 'basic.sample.fromstring.json'), stringify(result, null, 2));
        step_3();
    });
}
function step_3() {
    ittfMTreeEx.createFrom(path.join(__dirname, 'ittf', 'complex.sample.ittf'), {}, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        result.analize();
        var msg = stringify(result, null, 2);
        console.log('step_3', msg);
    });
}
function step_4() {
    ittfMTreeEx.createFrom(path.join("C:/My/wizzi/v5/apps/wizzi-studio/dist/server/ittf/repo/stefi/studio/wizzi/r_long_page", 'index.html.ittf'), {}, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        result.analize();
        var msg = stringify(result, null, 2);
        console.log('step_4', msg);
    });
}
function ittfFinder_step_1() {
    console.log('wizzi-utils.examples.ittfTree.ittfFinder_step_1');
    var ittfFinder = new IttfFinder(vfile());
    ittfFinder.resolvePath({
        ittfDocumentUri: path.join(__dirname, 'ittf', 'basic.sample.ittf')
    }, function(err, result) {
        console.log('ittfFinder_step_1.result.1', err, result);
        var callerFullPath = path.join(__dirname, 'ittf', 'basic.sample.ittf');
        ittfFinder.resolvePath({
            callerFullPath: callerFullPath, 
            fragmentName: 'frag_1'
        }, function(err, result) {
            console.log('ittfFinder_step_1.result.2', err, result);
        });
    });
}
