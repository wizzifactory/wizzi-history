/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\essentials\filesystem\jobs\level_2\step_4_go.js.ittf
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
var wizzi_job = function(step_callback) {
    heading1('Advanced-example starting');
    /**
         Wizzi job
         How to generate documents
         of the builtin schema `xml`
    */
    
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: __dirname, 
            pluginsBaseFolder: path.resolve(__dirname, '..'), 
            plugins: [
                'wizzi-core', 
                'wizzi-js', 
                'wizzi-web', 
                './localPlugin/index'
            ]
        }, 
        job: {
            name: 'level_2_xml_schema', 
            ittfDocumentUri: path.join(__dirname, 'step_4', 'xml_schema.wfjob.ittf'), 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
            }), 
            globalContext: {
                wfjobGlobalContextCheck: 'If you can see mee the wfjob global context works fine.'
            }
        }
    }, function(err, result) {
        if (err) {
            throw new Error(JSON.stringify(err, null, 2));
        }
        printValue('Result', 'Wizzi job level_2_xml_schema SUCCESSFULLY executed\n' + JSON.stringify(result, null, 2), 'dashes');
        if (step_callback) {
            step_callback(null);
        }
    });
};
wizzi_job.__name = 'Level 2 - wizzi_job';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 2 - step 4 - wizzi_job - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- wizzi_job - ' + text);
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
module.exports = wizzi_job;
if (typeof require != 'undefined' && require.main === module) {
    wizzi_job();
}
