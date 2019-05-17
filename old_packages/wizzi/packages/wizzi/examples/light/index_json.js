/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\examples\light\index_json.js.ittf
*/
'use strict';
var path = require('path');
var stringify = require('json-stringify-safe');
var wizzi = require('../../index');
var jsIttf = [
    'module', 
    '\tkind react', 
    '\treact MyComponent'
].join('\n');
wizzi.genFromText(jsIttf, {}, {
    artifactName: 'js/module'
}, function(err, artifactText) {
    if (err) {
        return callback(err);
    }
    console.log('genFromText', '\n', artifactText);
});
