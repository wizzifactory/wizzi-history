/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\examples\essentials\schemas\index.js.ittf
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
    var schemaFriendsPath = path.join(__dirname, 'ittf', 'schemas', 'friends.wfschema.ittf');
    var schemaFriendsOutputPath = path.join(__dirname, 'friendsplugin');
    // Generate the javascript modules of the 'friends' wizzi schema
    wizzi.schema(schemaFriendsPath, {
        comments: true
    }, {
        outputPackagePath: schemaFriendsOutputPath
    }, function(err, schemaPaths) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('schemaPaths of generated schema friends\n', schemaPaths);
        return callback(null, 'models example executed');
    });
};
