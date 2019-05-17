/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\examples\util\jsCodeReplacer.js.ittf
*/
'use strict';
var cr = require('../../lib/util/jsCodeReplacer');
var code = [
    'var x = 1;', 
    '{{alfa}}', 
    'var y = 2;'
].join('\n');
console.log('code', code);
var r = cr.clean(code);
console.log('cr.clean', r);
console.log('cr.restore', cr.restore(r.codeCleaned, r.replaceds));
