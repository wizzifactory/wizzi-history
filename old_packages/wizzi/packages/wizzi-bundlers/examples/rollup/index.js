/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\examples\rollup\index.js.ittf
*/
'use strict';
var async = require('async');
var samples = [
    require('./step_3_go')
];
function execute(callback) {
    async.series(samples, function(err, notUsed) {
        if (err) {
            throw new Error(JSON.stringify(err, null, 2));
        }
        var msg = 'rollup - Level 1 samples - done.';
        console.log(msg);
        if (callback) {
            return callback(null, msg);
        }
    });
}
module.exports = execute;
if (typeof require != 'undefined' && require.main==module) {
    execute();
}
