/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-demo\src\ittf\examples\starter\essentials\mtrees\level_0\step_2_go.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var stringify = require('json-stringify-safe');
var inspect = require('object-inspect');
var wizzi = require('wizzi');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var friendsArray = [
    'arthur', 
    'mary'
];
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 2 - mtree_composition - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- mtree_composition - ' + text);
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
function printValue(k, v, format, p1) {
    if (format === 'dashes' || format === 'meter') {
        console.log('   ', '-'.repeat(100));
    }
    if (format === 'json') {
        v = stringify(v, null, 4);
    }
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
    else if (verify.isObject(v)) {
        console.log('   ', k, ':', inspect(v));
    }
    else {
        console.log('   ', k, ':', v);
    }
    if (format === 'meter') {
        meterLine(p1, '     ' + new Array(1 + k.length).join(' '));
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
module.exports = function exec(step_callback) {
    heading1('example-essentials starting');
    /**
         DEMO: How to load a composed ittf document into an mTree.
        
         We use an `html` ittf document to show an example of
         composition, calling mixins.
        
         The `html` artifact here is not generated.
         We build the mTree only, just to take a look to node transformations.
    */
    console.log('    The primary ittf document `composed_1.html.ittf` mixes the `lia.html.ittf` mixin');
    console.log('You can se the raw ittf documents and the builded mTree');
    function load(callback) {
        wizzi.mtree(path.join(__dirname, 'step_2', 'composed_1.html.ittf'), {}, {
            raw: true
        }, callback);
    }
    // Now we can load the document
    load(function(err, mTreeModel) {
        if (err) {
            var fullErr = JSON.stringify(err, null, 2);
            console.log('Error fullErr', fullErr);
            throw new Error(JSON.stringify(err, null, 2));
        }
        heading2( 'composed_1.html.ittf - raw ittf document' );
        printValue('mTreeModel.dump(true)', mTreeModel.dump(true));
        function load(callback) {
            wizzi.mtree(path.join(__dirname, 'step_2', 't/lia.html.ittf'), {}, {
                raw: true
            }, callback);
        }
        // Now we can load the document
        load(function(err, mTreeModel) {
            if (err) {
                var fullErr = JSON.stringify(err, null, 2);
                console.log('Error fullErr', fullErr);
                throw new Error(JSON.stringify(err, null, 2));
            }
            heading2( 't/lia.html.ittf - raw ittf document' );
            printValue('mTreeModel.dump(true)', mTreeModel.dump(true));
            function load(callback) {
                wizzi.mtree(path.join(__dirname, 'step_2', 'composed_1.html.ittf'), {}, callback);
            }
            // Now we can load the document
            load(function(err, mTreeModel) {
                if (err) {
                    var fullErr = JSON.stringify(err, null, 2);
                    console.log('Error fullErr', fullErr);
                    throw new Error(JSON.stringify(err, null, 2));
                }
                heading2( 'composed_1.html.ittf - loaded mTree' );
                printValue('mTreeModel.dump(true)', mTreeModel.dump(true));
                step_callback(null);
            });
        });
    });
};
