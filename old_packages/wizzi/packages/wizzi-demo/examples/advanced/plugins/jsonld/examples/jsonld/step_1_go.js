/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\plugins\jsonld\examples\jsonld\step_1_go.js.ittf
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
var plugin_examples = function(step_callback) {
    heading1('Advanced-example starting');
    /**
         Commons
    */
    var wizziFactoryConfig = {
        plugins: {
            items: [
                './jsonld/local/index'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..', '..', '..')
        }
    };
    /**
         DEMO: how to load an jsonld ittf document into an mTree.
    */
    
    // Create a filesystem factory without access control
    wizzi.fsnoaclFactory(function(err, wf) {
        if (err) {
            var fullErr = JSON.stringify(err, null, 2);
            console.log('Error fullErr', fullErr);
            throw new Error(JSON.stringify(err, null, 2));
        }
        // Now we can load the mTree
        wf.loadMTree(path.join(__dirname, 'step_1', 'w3c.jsonld.ittf'), {}, function(err, mTreeModel) {
            if (err) {
                var fullErr = JSON.stringify(err, null, 2);
                console.log('Error fullErr', fullErr);
                throw new Error(JSON.stringify(err, null, 2));
            }
            // And print the mTree model object
            console.log('mTreeModel', mTreeModel);
            console.log('mTreeModel.dump(true)', mTreeModel.dump(true));
            console.log('mTreeModel.toIttf()', mTreeModel.toIttf());
            console.log('mTreeModel.toText()', mTreeModel.toText());
            jsonld_model();
        });
    });
    function jsonld_model() {
        // Create a filesystem factory without access control
        // requiring the local plugin.
        wizzi.fsnoaclFactory(wizziFactoryConfig, function(err, wf) {
            if (err) {
                var fullErr = JSON.stringify(err, null, 2);
                console.log('Error fullErr', fullErr);
                throw new Error(JSON.stringify(err, null, 2));
            }
            // Now we can load the model
            wf.loadModel(path.join(__dirname, 'step_1', 'w3c.jsonld.ittf'), {}, function(err, wizziModel) {
                if (err) {
                    var fullErr = JSON.stringify(err, null, 2);
                    console.log('Error fullErr', fullErr);
                    throw new Error(JSON.stringify(err, null, 2));
                }
                // And print the wizzi model object
                console.log('wizziModel', wizziModel);
                console.log('wizziModel.toJson()', wizziModel.toJson());
                var dest = path.join(__dirname, 'outputs', 'w3c.jsonld.json');
                wf.fileService.write(dest, stringify(wizziModel.toJson(), null, 4));
                if (step_callback) {
                    step_callback(null);
                }
                // _ jsonld_document_artifact
            });
        });
    }
    function jsonld_document_artifact() {
        wizzi.fsnoaclFactory(wizziFactoryConfig, function(err, wf) {
            if (err) {
                var fullErr = JSON.stringify(err, null, 2);
                console.log('Error fullErr', fullErr);
                throw new Error(JSON.stringify(err, null, 2));
            }
            wf.loadModelAndGenerateArtifact(path.join(__dirname, 'step_1', 'w3c.jsonld.ittf'), {
                modelContext: {}, 
                artifactContext: {}
            }, 'jsonld/document', function(err, artifactText) {
                if (err) {
                    var fullErr = JSON.stringify(err, null, 2);
                    console.log('Error fullErr', fullErr);
                    throw new Error(JSON.stringify(err, null, 2));
                }
                console.log('artifactText', artifactText);
                wizzi.file.write(path.join(__dirname, 'output', 'w3c.jsonld'), artifactText);
                if (step_callback) {
                    step_callback(null);
                }
            });
        });
    }
};
plugin_examples.__name = 'Level jsonld - plugin_examples';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level jsonld - step 1 - plugin_examples - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- plugin_examples - ' + text);
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
module.exports = plugin_examples;
if (typeof require != 'undefined' && require.main === module) {
    plugin_examples();
}
