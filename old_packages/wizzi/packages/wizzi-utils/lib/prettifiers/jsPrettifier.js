/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\lib\prettifiers\jsprettifier.js.ittf
*/
'use strict';
var beautify = require('js-beautify').js_beautify;
var fs = require('fs');
fs.readFile('foo.js', 'utf8', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(beautify(data, { indent_size: 2 }));
});
