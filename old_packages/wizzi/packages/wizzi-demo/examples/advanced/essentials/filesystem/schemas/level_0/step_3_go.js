/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\essentials\filesystem\schemas\level_0\step_3_go.js.ittf
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
var wizzischema = function(step_callback) {
    heading1('Advanced-example starting');
    /**
         DEMO: how to generate model types for a new wizzi schema
    */
    
    // Create a filesystem factory without access control,
    // configured with the default wizzi plugins and
    // a local plugin.
    wizzi.fsnoaclFactory({
        plugins: {
            items: [
                'wizzi-core', 
                'wizzi-js', 
                'wizzi-web', 
                './local/index'
            ], 
            pluginsBaseFolder: path.resolve(__dirname)
        }, 
        globalContext: globalContext
    }, function(err, wf) {
        if (err) {
            var fullErr = JSON.stringify(err, null, 2);
            console.log('Error fullErr', fullErr);
            throw new Error(JSON.stringify(err, null, 2));
        }
        // Now we can generate the wizzi model artifacts.
        // They will be written in the folder passed as second parameter,
        // that is the folder of our local plugin.
        // The wizzi model artifact "sample_0_3" is created after that the wizzi factory
        // has been configured with the local plugin. That is ok. The model factory
        // will be retrieved before use. There is no check for existence at plugin initialization time.
        wf.generateModelTypes(path.join(__dirname, 'step_3', 'sample_0_3.wfschema.ittf'), path.join(__dirname, 'local'), 'sample_0_3', mTreeBuildupContext, function(err, result) {
            if (err) {
                var fullErr = JSON.stringify(err, null, 2);
                console.log('Error fullErr', fullErr);
                throw new Error(JSON.stringify(err, null, 2));
            }
            printValue('Result', 'Wizzi model of schema sample_0_3 generated. \n' + JSON.stringify(result, null, 2), 'dashes');
            wf.loadModel(path.join(__dirname, 'step_3', 'first.sample_0_3.ittf'), mTreeBuildupContext, function(err, wizziModel) {
                if (err) {
                    var fullErr = JSON.stringify(err, null, 2);
                    console.log('Error fullErr', fullErr);
                    throw new Error(JSON.stringify(err, null, 2));
                }
                // And print the loaded model
                printValue('Result', 'Ittf document first.sample_0_3.ittf loaded.', 'dashes');
                if (wizziModel.toJson) {
                    printValue('wizziModel.toJson()', stringify(wizziModel.toJson(), null, 4), 'dashes');
                }
                else {
                    printValue('wizziModel', stringify(wizziModel, null, 4), 'dashes');
                }
                if (step_callback) {
                    step_callback(null);
                }
            });
        });
    });
};
wizzischema.__name = 'Level 0 - wizzischema';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 3 - wizzischema - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- wizzischema - ' + text);
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
module.exports = wizzischema;
if (typeof require != 'undefined' && require.main === module) {
    wizzischema();
}
