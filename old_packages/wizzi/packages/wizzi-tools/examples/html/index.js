/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\examples\html\index.js.ittf
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var htmlwizzifier = require('../../lib/wizzifiers/htmlparser/wizzi/wizzifier');
var file = require('wizzi-utils').file;

async.map([
    'index'
], wizzify, function(err, result) {
    console.log('Terminated. result: ', result);
});
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.html');
    
    console.log('source', source);
    htmlwizzifier.getWizziIttf(file.read(source), {
        dumpfile: path.join(__dirname, 'data', 'output', name + '.html.dump')
    }, function(err, ittf) {
        // log 'ittf', ittf
        if (err) {
            console.log('error wizzifying: ' + source);
            console.log('err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.html.ittf'), ittf);
        return callback(null, 'success ' + source);
    });
}
