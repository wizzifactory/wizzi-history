/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\essentials\filesystem\jobs\mongodb\index.js.ittf
    utc time: Fri, 21 Sep 2018 18:09:43 GMT
*/
'use strict';
var async = require('async');
var samples = [
    require('./step_1_go')
];
function execute(callback) {
    async.series(samples, function(err, notUsed) {
        if (err) {
            throw new Error(JSON.stringify(err, null, 2));
        }
        var msg = 'wizzi jobs - mongodb - Level 0 samples - done.';
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
