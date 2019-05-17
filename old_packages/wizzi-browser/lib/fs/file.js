/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\lib\fs\file.js.ittf
*/
'use strict';
// For use in webpack (isWebpackTarget == true)
// not implemented
var md = module.exports = {};
md.openWrite = function() {
};
md.splitLines = function(contents) {
    var i,
        l = contents.length,
        result = [],
        line = [],
        ch,
        chprev;
    for (i = 0; i < l; i++) {
        chprev = ch;
        ch = contents[i];
        if ((ch === '\n' && chprev !== '\r') || (ch === '\r' && chprev !== '\n')) {
            result.push(line.join(''));
            line = [];
        }
        else if ((ch === '\n' && chprev === '\r') || (ch === '\r' && chprev === '\n')) {
        }
        else {
            line.push(ch);
        }
    }
    if (line.length > 0) {
        result.push(line.join(''));
    }
    return result;
};
