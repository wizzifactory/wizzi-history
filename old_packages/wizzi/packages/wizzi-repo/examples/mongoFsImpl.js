/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-repo\src\ittf\examples\mongofsimpl.js.ittf
*/
'use strict';

/** -àà
     EXAMPLE: wizzi-repo.examples.mongoFsImpl
*/

var myname = 'wizzi-repo.examples.mongoFsImpl';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var vfile = require('wizzi-utils').vfile;
// defaults to filesystem
var fsfile = vfile();
var verify = require('wizzi-utils').verify;
var MongoFsImpl = require('../lib/mongodb/mongoFsimpl');

var fsimpl = new MongoFsImpl(null, 'c:/wz/users');
heading1('start');
fsimpl.open(function(err, notUsed) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    fsimpl.writeFile('db://stefi/wf/folder1/hello.js.ittf', 'Hello wizzi factory', function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        heading2('writeFile');
        printValue('result', result);
        _readFile();
    });
    function _readFile() {
        fsimpl.readFile('db://stefi/wf/folder1/hello.js.ittf', function(err, content) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            heading2('readFile');
            printValue('content', content);
            fsimpl.close();
        });
    }
});
function heading1(text) {
    console.log('');
    console.log('********************************************************************************');
    console.log('** Example wizzi-repo.examples.mongoFsImpl - ' + text);
    console.log('********************************************************************************');
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('--------------------------------------------------------------------------------');
    console.log('-- Example wizzi-repo.examples.mongoFsImpl - ' + text);
    console.log('--------------------------------------------------------------------------------');
    console.log('');
}
function printArray(name, arr, fields) {
    console.log('* array ' + name + ' : ');
    var i, i_items=arr, i_len=arr.length, item;
    for (i=0; i<i_len; i++) {
        item = arr[i];
        console.log('  {', i);
        var keys = fields || Object.keys(item);
        var j, j_items=keys, j_len=keys.length, k;
        for (j=0; j<j_len; j++) {
            k = keys[j];
            printValue(k, item[k]);
        }
    }
}
function printValue(k, v) {
    if (verify.isNotEmpty(v)) {
        var lines = verify.splitLines(v, {
            numbered: true
        });
        if (lines.length === 1) {
            console.log('   ', k, ':', lines[0].text);
        }
        else {
            for (var i=0; i<lines.length; i++) {
                if (i === 0) {
                    console.log('   ', k, ':', lines[0].numFmt, lines[0].text);
                }
                else {
                    console.log('   ', spaces(k.length+1), ' ', lines[i].numFmt, lines[i].text);
                }
            }
        }
    }
    else {
        console.log('   ', k, ':', v);
    }
}
function spaces(len) {
    return new Array(len).join(' ');
}
