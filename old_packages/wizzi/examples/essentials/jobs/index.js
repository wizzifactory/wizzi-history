/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\examples\essentials\jobs\index.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var stringify = require('json-stringify-safe');
var wizzi = require('wizzi');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var friendsArray = [
    'arthur', 
    'mary'
];
module.exports = function exec(callback) {
    var jobsPath = path.join(__dirname, 'ittf', 'jobs');
    // Execute a wizzi job
    wizzi.job(path.join(jobsPath, 'step_1.wfjob.ittf'), {
        friends: friendsArray
    }, {
        name: 'step_1', 
        jobContext: {
            options: {
                destFolder: 'output'
            }
        }, 
        globalContext: {
            options: {
                destFolder: 'output'
            }
        }
    }, function(err, jobResults) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('results of job step_1\n', stringify(jobResults, null, 2));
        return callback(null, 'jobs example executed');
    });
};
