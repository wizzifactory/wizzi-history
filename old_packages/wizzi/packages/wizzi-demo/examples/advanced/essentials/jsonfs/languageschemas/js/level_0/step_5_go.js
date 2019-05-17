/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\essentials\jsonfs\languageschemas\js\level_0\step_5_go.js.ittf
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
var ObjectId = require('wizzi-repo').ObjectId;
var id1 = new ObjectId();
var mTreeBuildupContext = {};
var artifactContext = {};
var globalContext = {};
var language_schema_js = function(step_callback) {
    heading1('Advanced-example starting');
    /**
         DEMO: javascript module coded in 'js' wizzi language schema
    */
    
    
    function execute(jsonFsData) {
        // Create a json factory without access control
        wizzi.jsonnoaclFactory({
            plugins: {
                items: [
                    'wizzi-core', 
                    'wizzi-js', 
                    'wizzi-web'
                ]
            }, 
            jsonFsData: jsonFsData, 
            globalContext: globalContext
        }, function(err, wf) {
            if (err) {
                var fullErr = JSON.stringify(err, null, 2);
                console.log('Error fullErr', fullErr);
                throw new Error(JSON.stringify(err, null, 2));
            }
            wf.loadModelAndGenerateArtifact(path.join(__dirname, 'step_5', 'module_1.js.ittf'), {
                modelRequestContext: {}, 
                artifactRequestContext: {}
            }, 'js/module', function(err, artifactText) {
                if (err) {
                    var fullErr = JSON.stringify(err, null, 2);
                    console.log('Error fullErr', fullErr);
                    throw new Error(JSON.stringify(err, null, 2));
                }
                // Save the artifact
                // to the ./outputs folder
                var dest = path.join(__dirname, 'step_5', 'outputs', verify.stripExtension('module_1.js.ittf'));
                wizzi.file.write(dest, artifactText);
                console.log(verify.stripExtension('module_1.js.ittf') + ' saved to ' + dest);
                printValue('artifactText', artifactText);
            });
        });
    }
    
    function getJsonFsData() {
        return {
                items: [
                    {
                        _id: id1, 
                        parentId: null, 
                        path: "c:/my/wizzi/v5/apps/wizzi-demo/dist/languageschemas/js/level_0/step_5/module_1.js.ittf"
                    }
                ], 
                documents: [
                    {
                        _id: id1, 
                        content: "module\n    kind react\n    react MyComponent"
                    }
                ]
            };
    }
    
    execute(getJsonFsData());
};
language_schema_js.__name = 'Level 0 - language_schema_js';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 5 - language_schema_js - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- language_schema_js - ' + text);
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
module.exports = language_schema_js;
if (typeof require != 'undefined' && require.main === module) {
    language_schema_js();
}
