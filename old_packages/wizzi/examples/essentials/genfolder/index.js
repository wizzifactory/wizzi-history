/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\examples\essentials\genfolder\index.js.ittf
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
    var genFolderPath = path.join(__dirname, 'ittf', 'genfolder', 'index.js.ittf');
    var genFolderDest = path.join(__dirname, 'genfolder_out');
    // Generate all the artifacts in a folder
    wizzi.genFolder(genFolderPath, {
        friends: friendsArray
    }, {
        destFolder: genFolderDest, 
        copyInclude: ['*'], 
        copyExclude: []
    }, function(err, schemaPaths) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('genFolder wrote generated and copied files to dest folder\n', schemaPaths);
    });
};
