/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\examples\graphql\index.js.ittf
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var graphqlwizzifier = require('../../lib/wizzifiers/graphqlparser/graphql/wizzifier');
var file = require('wizzi-utils').file;

async.map([
    'data'
], wizzify, function(err, result) {
    console.log('Terminated. result: ', result);
});
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.graphql');
    
    graphqlwizzifier.getWizziIttf(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.graphql.sinthax')
    }, function(err, ittf) {
        console.log(1);
        if (err) {
            console.log('error wizzifying: ' + source);
            console.log('err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.graphql.ittf'), ittf);
        return callback(null, 'success ' + source);
    });
}
