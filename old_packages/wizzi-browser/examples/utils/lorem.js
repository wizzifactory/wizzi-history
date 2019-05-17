/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\utils\lorem.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var file = require('../../lib/fs/file');
var vfile = require('../../lib/fs/vfile');
var verify = require('../../lib/verify');
var lorem = require('../../lib/lorem');
var encdec = require('../../lib/crypto/encdec');


var text = lorem({
    count: 100
});
console.log('lorem.100', text);
text = lorem({
    count: 10, 
    units: 'paragraphs', 
    htmlTag: 'p'
});
console.log('lorem.10.paragraphs.p\n', text);
