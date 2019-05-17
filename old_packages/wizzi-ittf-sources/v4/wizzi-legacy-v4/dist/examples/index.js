/*
    artifact generator: C:\My\wizzi\v4\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\legacy\wizzi-legacy-v4\src\ittf\examples\index.js.ittf
    utc time: Wed, 15 Nov 2017 16:53:10 GMT
*/
'use strict';
var path = require('path');
var legacy = require('../index');
legacy.jsModule(path.join(__dirname, 'ittf', 'sample.js.ittf')
, {}, function(err, artifact) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('js artifact', artifact);
    legacy.htmlDocument(path.join(__dirname, 'ittf', 'sample.html.ittf')
    , {}, function(err, artifact) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('html artifact', artifact);
    });
});