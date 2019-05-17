/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\plugins\regexp\examples\regexp\step_1_go.js.ittf
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
         DEMO: How to use the `regexp` wizzi model type to
         test regular expressions
    */
    
    /**
         Commons
    */
    var wizziFactoryConfig = {
        plugins: {
            items: [
                './regexp/local/index'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..', '..', '..')
        }
    };
    
    // Create a filesystem factory without access control.
    // For mTrees we require the dump of the mTree
    // buildup jsWizzi script. Just to take a look.
    wizzi.fsnoaclFactory({
        globalContext: globalContext, 
        test: {
            dumps: {
                dumpsBaseFolder: path.join(__dirname, 'step_1', 'dumps'), 
                mTreeBuildupJsWizziScript: {
                    dump: true
                }
            }
        }
    }, function(err, wf) {
        if (err) {
            var fullErr = JSON.stringify(err, null, 2);
            console.log('Error fullErr', fullErr);
            throw new Error(JSON.stringify(err, null, 2));
        }
        function load(callback) {
            wf.loadMTree(path.join(__dirname, 'step_1', 'first.regexp.ittf'), {}, callback);
        }
        // Now we can load the document
        load(function(err, mTreeModel) {
            if (err) {
                var fullErr = JSON.stringify(err, null, 2);
                console.log('Error fullErr', fullErr);
                throw new Error(JSON.stringify(err, null, 2));
            }
            heading2( 'first.regexp.ittf - loaded mTree' );
            printValue('mTreeModel.dump(true)', mTreeModel.dump(true));
            if (typeof wizziFactoryConfig.globalContext === 'undefined') {
                wizziFactoryConfig.globalContext = globalContext;
            }
            // Create a filesystem factory without access control
            wizzi.fsnoaclFactory(wizziFactoryConfig, function(err, wf) {
                if (err) {
                    var fullErr = JSON.stringify(err, null, 2);
                    console.log('Error fullErr', fullErr);
                    throw new Error(JSON.stringify(err, null, 2));
                }
                // Now we can load the model
                wf.loadModel(path.join(__dirname, 'step_1', 'first.regexp.ittf'), {}, function(err, wizziModel) {
                    if (err) {
                        var fullErr = JSON.stringify(err, null, 2);
                        console.log('Error fullErr', fullErr);
                        throw new Error(JSON.stringify(err, null, 2));
                    }
                    // And save the model in json format
                    // to the ./outputs folder
                    var dest = path.join(__dirname, 'step_1', 'outputs', 'first.regexp.ittf.json');
                    wf.fileService.write(dest, wizziModel.toJson());
                    console.log('   ', 'The json representation of first.regexp.ittf.json was saved to ' + dest);
                    printValue('wizziModel.toJson()', wizziModel.toJson());
                    console.log('wizziModel.executables', Object.keys(wizziModel.executables));
                    console.log('wizziModel.elements', Object.keys(wizziModel.elements));
                    var results = wizziModel.execTests();
                    var i, i_items=results, i_len=results.length, r;
                    for (i=0; i<i_len; i++) {
                        r = results[i];
                        var e = r.expected;
                        var ie = r.isExpected;
                        delete r.expected
                        delete r.isExpected
                        printValue('test', r, 'dashes');
                        if (ie) {
                            console.log('     ', 'OK');
                        }
                        else if (ie === null) {
                            console.log('     ', 'unknown expected value');
                        }
                        else {
                            console.log('     ', '*****', 'ERROR', 'expected', e);
                        }
                    }
                    if (step_callback) {
                        step_callback(null);
                    }
                });
            });
        });
    });
};
plugin_examples.__name = 'Level regexp - plugin_examples';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level regexp - step 1 - plugin_examples - ' + text);
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
