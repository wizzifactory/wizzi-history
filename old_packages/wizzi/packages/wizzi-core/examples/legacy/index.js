/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\examples\legacy\index.js.ittf
*/
'use strict';
var path = require('path');
var legacy = require('../../legacy');
legacy.jsModule(path.join(__dirname, 'ittf', 'sample.js.ittf'), {}, function(err, artifact) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('js artifact', artifact);
    legacy.htmlDocument(path.join(__dirname, 'ittf', 'sample.html.ittf'), {}, function(err, artifact) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('html artifact', artifact);
    });
});
