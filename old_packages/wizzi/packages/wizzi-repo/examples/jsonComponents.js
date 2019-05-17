/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-repo\src\ittf\examples\jsoncomponents.js.ittf
*/
'use strict';

/** -àà
     EXAMPLE: wizzi-repo.examples.jsonComponents
*/

var myname = 'wizzi-repo.examples.jsonComponents';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var vfile = require('wizzi-utils').vfile;
// defaults to filesystem
var fsfile = vfile();
var verify = require('wizzi-utils').verify;
var json = require('../lib/json/index');

heading1('start');
var documents = [];
documents.push({
    path: 'c:/root/folder1/index.html.ittf', 
    content: [
        'html', 
        '    body', 
        '        ul', 
        '            lia( stefi )', 
        '            lia_img( annie, photo.jpg )'
    ].join('\n')
});
documents.push({
    path: 'c:/root/folder1/t/lia.html.ittf', 
    content: [
        'li', 
        '    a', 
        '        href'
    ].join('\n')
});
documents.push({
    path: 'c:/root/folder1/t/lia_img.html.ittf', 
    content: [
        'li', 
        '    a', 
        '        href', 
        '        img'
    ].join('\n')
});
json.createJsonFsData(documents, function(err, jsonFsData) {
    console.log('err', err);
    if (err) {
        throw new Error(JSON.stringify(err, null, 2));
    }
    printValue(jsonFsData);
    addDocuments(jsonFsData);
});
function addDocuments(jsonFsData) {
    heading2('addDocuments');
    var documents = [];
    documents.push({
        path: 'c:/root/folder2/index.html.ittf', 
        content: [
            'module', 
            '    kind react'
        ].join('\n')
    });
    json.addToJsonFsData(jsonFsData, documents, function(err, jsonFsData) {
        console.log('err', err);
        if (err) {
            throw new Error(JSON.stringify(err, null, 2));
        }
        printValue(jsonFsData);
        extractDocuments(jsonFsData);
    });
}
function extractDocuments(jsonFsData) {
    heading2('extractDocuments');
    var doc = json.createDocumentManager(jsonFsData);
    doc.getFiles('c:/', {
        deep: true, 
        documentContent: true
    }, function(err, files) {
        console.log('err', err);
        if (err) {
            throw new Error(JSON.stringify(err, null, 2));
        }
        printValue(files);
    });
}
function heading1(text) {
    console.log('');
    console.log('********************************************************************************');
    console.log('** Example wizzi-repo.examples.jsonComponents - ' + text);
    console.log('********************************************************************************');
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('--------------------------------------------------------------------------------');
    console.log('-- Example wizzi-repo.examples.jsonComponents - ' + text);
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
