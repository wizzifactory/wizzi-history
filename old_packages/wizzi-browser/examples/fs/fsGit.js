/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\fs\fsgit.js.ittf
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
var os = require('os');


var xgit = fsGit();
console.log('xgit', xgit);
var fs = xgit.fs;
var git = xgit.git;
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
console.log('dir', dir);
git.clone({
    fs: fs, 
    dir: dir, 
    url: 'https://github.com/isomorphic-git/isomorphic-git', 
    ref: 'master', 
    singleBranch: true, 
    depth: 10
}, function(err, result) {
    console.log('err', err);
    console.log('result', result);
});
