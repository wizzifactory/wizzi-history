/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\essentials\mongodb\jobs\level_0\step_1_upload.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var wizzi = require('wizzi');
var stringify = require('json-stringify-safe');
var inspect = require('object-inspect');
var wzutils = require('wizzi-utils');
var verify = require('wizzi-utils').verify;
var vfile = require('wizzi-utils').vfile;
var fsfile = vfile();
var mTreeBuildupContext = {};
var artifactContext = {};
var globalContext = {};
var wizzi_job_mongodb_level_0_step_1_upload = function(step_callback) {
    heading1('Advanced-example starting');
    var repo = require('wizzi-repo');
    // Test mongoDb config
    // mongodbUri 'mongodb://localhost:27017/test'
    // mongodbBaseFolder `c:/wizzifactory/users`
    // example
    // folder `wizzijob`
    // of project `demo`
    // of user `stefi`
    // has uri
    // `db://stefi/demo/wizzijob`
    // and maps to internal mongodb filesystem path
    // `c:/wizzifactory/users/stefi/demo/wizzijob`
    var testMongodbUri = 'mongodb://localhost:27017/test';
    var testMongodbBaseFolder = 'c:/wizzifactory/users';
    var demoUploadMongodbBaseFolder = path.join(testMongodbBaseFolder, 'stefi', 'demo');
    repo.mongoDbDocumentManager(testMongodbUri, function(err, docman) {
        if (err) {
            var fullErr = JSON.stringify(err, null, 2);
            console.log('Error fullErr', fullErr);
            throw new Error(JSON.stringify(err, null, 2));
        }
        heading2('uploadFolder');
        docman.uploadFolder(path.join(__dirname, 'step_1'), path.join(demoUploadMongodbBaseFolder, 'wizzijob', 'level_0', 'step_1'), function(err, result) {
            if (err) {
                var fullErr = JSON.stringify(err, null, 2);
                console.log('Error fullErr', fullErr);
                throw new Error(JSON.stringify(err, null, 2));
            }
            printValue('result', result);
            docman.close();
        });
    });
};
wizzi_job_mongodb_level_0_step_1_upload.__name = 'Level 0 - wizzi_job_mongodb_level_0_step_1_upload';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 1 - wizzi_job_mongodb_level_0_step_1_upload - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- wizzi_job_mongodb_level_0_step_1_upload - ' + text);
    console.log('   ', '-'.repeat(100));
    console.log('');
}
function printArray(name, arr, fields, format) {
    if (format === 'dashes') {
        console.log('   ', '-'.repeat(100));
    }
    console.log('   ', '* array ' + name + ' : ');
    var i, i_items=arr, i_len=arr.length, item;
    for (i=0; i<i_len; i++) {
        item = arr[i];
        console.log('    {', i);
        var keys = fields || Object.keys(item);
        var j, j_items=keys, j_len=keys.length, k;
        for (j=0; j<j_len; j++) {
            k = keys[j];
            printValue(k, item[k]);
        }
    }
}
function printValue(key, value, format, p1) {
    if (format === 'dashes' || format === 'meter') {
        console.log('   ', '-'.repeat(100));
    }
    if (format === 'json') {
        value = stringify(value, null, 4);
    }
    if (verify.isNotEmpty(value)) {
        var lines = verify.splitLines(value, {
            numbered: true
        });
        if (lines.length === 1) {
            console.log('   ', key, ':', lines[0].text);
        }
        else {
            for (var i=0; i<lines.length; i++) {
                if (i === 0) {
                    console.log('   ', key, ':', lines[0].numFmt, lines[0].text);
                }
                else {
                    console.log('   ', spaces(key.length+1), ' ', lines[i].numFmt, lines[i].text);
                }
            }
        }
    }
    else if (verify.isObject(value)) {
        console.log('   ', key, ':', inspect(value));
    }
    else {
        console.log('   ', key, ':', value);
    }
    if (format === 'meter') {
        meterLine(p1, '     ' + new Array(1 + key.length).join(' '));
    }
}
function spaces(len) {
    return new Array(len).join(' ');
}
function meterLine(len, indent) {
    var sb = [];
    var numW = len < 10 ? 1 : ( len < 100 ? 2 : 3 );
    var x;
    for (var i=0; i<numW; i++) {
        for (var j=0; j<len; j++) {
            x = formatNum(j, numW);
            sb.push(x.substr(i,1));
        }
        console.log(indent, sb.join(''));
        sb = [];
    }
}
function formatNum(num, len) {
    var x = num.toString();
    return new Array(1 + len-x.length).join(' ') + x;
}
module.exports = wizzi_job_mongodb_level_0_step_1_upload;
if (typeof require != 'undefined' && require.main === module) {
    wizzi_job_mongodb_level_0_step_1_upload();
}
