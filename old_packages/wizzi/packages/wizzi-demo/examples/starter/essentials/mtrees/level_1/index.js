/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\examples\starter\essentials\mtrees\level_1\index.js.ittf
*/
'use strict';
var async = require('async');
var samples = [
    require('./step_1_go')
];
function execute() {
    async.series(samples, function(err, notUsed) {
        if (err) {
            var fullErr = JSON.stringify(err, null, 2);
            console.log('Error fullErr', fullErr);
            throw new Error(JSON.stringify(err, null, 2));
        }
        console.log('Level 1 samples done.');
    });
}
module.exports = execute;
if (typeof require != 'undefined' && require.main==module) {
    execute();
}