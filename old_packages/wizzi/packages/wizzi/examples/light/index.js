/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\examples\light\index.js.ittf
*/
'use strict';
var path = require('path');
var stringify = require('json-stringify-safe');
var wizzi = require('../../index');
var htmlFriendsPath = path.join(__dirname, 'ittf', 'mtree', 'friends.html.ittf');
var friendsArray = [
    'arthur', 
    'mary'
];
var schemaFriendsPath = path.join(__dirname, 'ittf', 'schemas', 'friends.wfschema.ittf');
var schemaFriendsOutputPath = path.join(__dirname, 'friendsplugin');
var jobsPath = path.join(__dirname, 'ittf', 'jobs');
var genFolderPath = path.join(__dirname, 'ittf', 'genfolder', 'index.js.ittf');
var genFolderDest = path.join(__dirname, 'genfolder_out');
var modelsComplexPath = path.join(__dirname, 'ittf', 'models', 'complex')// Load a complex wizzi model passing a model description to the loader
    // of a new wizzi plugin.
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
    });
