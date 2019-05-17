/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\examples\essentials\generations\index.js.ittf
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
    var htmlFriendsPath = path.join(__dirname, 'ittf', 'models', 'friends.html.ittf');
    /** -àà
        Generate the html document artifact.
         No options, the default artifact generator
         for the html schema will be used.
    */
    wizzi.gen(htmlFriendsPath, {
        friends: friendsArray
    }, function(err, artifactText) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('artifactText friends\n', artifactText);
    });
};
