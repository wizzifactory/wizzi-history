/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\plugins\regexp\examples\index.js.ittf
*/
'use strict';
var async = require('async');
var examples = [
    require('./regexp')
];
function exec(callback) {
    async.mapSeries(examples, function(example, callback) {
        example(callback);
    }, function(err, results) {
        if (err) {
            throw new Error(JSON.stringify(err, null, 2));
        }
        console.log('Plugins examples results\n', results);
        if (callback) {
            callback(null, 'Plugins examples executed');
        }
    });
}
module.exports = function(callback) {
    exec(callback);
};
if (require.main === module) {
    exec();
}
