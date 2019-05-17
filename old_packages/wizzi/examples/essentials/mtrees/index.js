/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\examples\essentials\mtrees\index.js.ittf
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
    var htmlFriendsPath = path.join(__dirname, 'ittf', 'mtrees', 'friends.html.ittf');
    // Load a magical tree from an ittf document and a context object.
    wizzi.mtree(htmlFriendsPath, {
        friends: friendsArray
    }, function(err, mTreeModel) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        var dump = stringify(mTreeModel.toIttf(), null, 2);
        console.log('mTree friends\n', dump);
        return callback(null, 'mtrees example executed');
    });
};
