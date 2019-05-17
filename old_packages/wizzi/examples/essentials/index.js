/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\examples\essentials\index.js.ittf
*/
'use strict';
var async = require('async');
var examples = [
    require('./mtrees'), 
    require('./models'), 
    require('./jobs'), 
    require('./schemas')
];
async.mapSeries(examples, function(example, callback) {
    example(callback);
}, function(err, results) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('essentials examples results\n', results);
});
