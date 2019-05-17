/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\lib\requirefromstring.js.ittf
*/
'use strict';
// License
// MIT © Vsevolod Strukchinsky [https://github.com/floatdrop]
// original source [https://github.com/floatdrop/require-from-string/blob/master/index.js]
var Module = require('module');
var path = require('path');
module.exports = function requireFromString(code, filename, opts) {
    if (typeof filename === 'object') {
        opts = filename;
        filename = undefined;
    }
    opts = opts || {};
    filename = filename || '';
    opts.appendPaths = opts.appendPaths || [];
    opts.prependPaths = opts.prependPaths || [];
    if (typeof code !== 'string') {
        throw new Error('code must be a string, not ' + typeof code);
    }
    var paths = Module._nodeModulePaths(path.dirname(filename));
    var parent = module.parent;
    var m = new Module(filename, parent);
    m.filename = filename;
    m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths);
    m._compile(code, filename);
    var exports = m.exports;
    parent.children && parent.children.splice(parent.children.indexOf(m), 1);
    return exports;
};
