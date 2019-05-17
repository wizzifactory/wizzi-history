/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\utils\encdec.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var file = require('../../lib/fs/file');
var vfile = require('../../lib/fs/vfile');
var fsGit = require('../../lib/fs/fsGit');
var verify = require('../../lib/verify');
var lorem = require('../../lib/lorem');
var encdec = require('../../lib/crypto/encdec');


var text = 'alba chiara';
var hash = encdec.encrypt(text);
console.log('encdec ', text, '=', encdec.decrypt(hash), hash);
hash = encdec.encrypt(text);
console.log('encdec ', text, '=', encdec.decrypt(hash), hash);
hash = encdec.encryptSimple(text);
console.log('encdecSimple ', text, '=', encdec.decryptSimple(hash), hash);
hash = encdec.encryptSimple(text);
console.log('encdecSimple ', text, '=', encdec.decryptSimple(hash), hash);
