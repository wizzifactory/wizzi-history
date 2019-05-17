/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\examples\essentials\models\index.js.ittf
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
    var modelsComplexPath = path.join(__dirname, 'ittf', 'models', 'complex');
    /** -àà
        Load an html model.
         The html schema is detected from the path.
    */
    wizzi.model(htmlFriendsPath, {
        friends: friendsArray
    }, function(err, wizziModel) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        var dump = stringify(wizziModel.elements, null, 2);
        console.log('wizziModel friends\n', dump);
        // Load a complex wizzi model passing a model description to the loader
        wizzi.model({
            src: path.join(modelsComplexPath, 'forms.html.ittf'), 
            schema: 'html', 
            contexts: [
                {
                    src: path.join(modelsComplexPath, 'formsData.json.ittf'), 
                    schema: 'json', 
                    exportName: 'data'
                }
            ]
        }, function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('wizziModel.wzElement', wizziModel.wzElement);
            wizzi.gen(wizziModel, function(err, artifactText) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('artifactText complex forms\n', artifactText);
            });
            return callback(null, 'models example executed');
        });
    });
};
