/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\examples\json\index.js.ittf
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var jsonwizzifier = require('../../lib/wizzifiers/jsonparser/wizzi/wizzifier');
var file = require('wizzi-utils').file;

async.map([
    'archive'
], wizzify, function(err, result) {
    console.log('Terminated. result: ', result);
});
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.json');
    
    console.log('source', source);
    jsonwizzifier.getWizziIttf(file.read(source), {
        dumpfile: path.join(__dirname, 'data', 'output', name + '.json.dump')
    }, function(err, ittf) {
        console.log('ittf\n', ittf);
        if (err) {
            console.log('error wizzifying: ' + source);
            console.log('err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.json.ittf'), ittf);
        return callback(null, 'success ' + source);
    });
}
