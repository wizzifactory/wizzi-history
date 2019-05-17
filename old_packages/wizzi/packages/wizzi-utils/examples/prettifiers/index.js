/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\prettifiers\index.js.ittf
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


var rootIndex = require('../../index');
var ittfMTreeEx = require('../../lib/ittfTree/ittfMTreeEx');
var ittfHtmlPrettifier = require('../../lib/prettifiers/ittfHtmlPrettifier');
step_1();
function step_1() {
    ittfMTreeEx.createFrom(path.join(__dirname, 'ittf', 'basic.sample.ittf'), {}, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        var pretty = ittfHtmlPrettifier(result, {});
        file.write(path.join(__dirname, 'outputs', 'basic.sample.pretty.html'), pretty.prettyLines.join('\n'));
        step_2();
    });
}
function step_2() {
    var pretty = ittfHtmlPrettifier(path.join(__dirname, 'ittf', 'basic.sample.ittf'), {});
    console.log('step_2', pretty);
    step_3();
}
function step_3() {
    rootIndex.prettifyFromString([
        'module', 
        '\t$include item'
    ].join('\n'), function(err, pretty) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('step_3', pretty);
    });
}
