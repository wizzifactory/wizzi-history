/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-repo\src\ittf\examples\jsonfsjson.js.ittf
*/
'use strict';

/** -àà
     EXAMPLE: wizzi-repo.examples.jsonFsJson
*/

var myname = 'wizzi-repo.examples.jsonFsJson';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var vfile = require('wizzi-utils').vfile;
// defaults to filesystem
var fsfile = vfile();
var verify = require('wizzi-utils').verify;
var json = require('../lib/json/index');

heading1('start');
var fsJson = new json.FsJson();
dump();
fsJson.insertItem({
    basename: 'alpha.js.ittf', 
    dirname: 'w:/zero', 
    kind: 1
}, function(err, result) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('insert.alpha.js.ittf.result', result);
    var insertedId = result.insertedId;
    dump();
    result.item.basename = 'beta.js.ittf';
    fsJson.updateItem(result.item, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('update.beta.js.ittf.result', result);
        dump();
        fsJson.writeDocument(result.item._id, 'My content', function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('write.beta.js.ittf.result', result);
            dump();
            fsJson.readDocument(result.item._id, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('read.beta.js.ittf.result', result);
                fsJson.deleteItem(insertedId, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    console.log('delete.beta.js.ittf.result', result);
                    dump();
                });
            });
        });
    });
});
function dump() {
    printValue('fsJson.items', fsJson.items);
    printValue('fsJson.documents', fsJson.documents);
}
function heading1(text) {
    console.log('');
    console.log('********************************************************************************');
    console.log('** Example wizzi-repo.examples.jsonFsJson - ' + text);
    console.log('********************************************************************************');
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('--------------------------------------------------------------------------------');
    console.log('-- Example wizzi-repo.examples.jsonFsJson - ' + text);
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
