/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-monorepo\src\ittf\root\filemod.js.ittf
*/
'use strict';
var fs = require('fs');
var path = require('path');
var filePath;
var strReg;
var strRepl;
var regMod = 'i';
var viewOnly = false;
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
var args = process.argv.slice(2);
args.forEach((val, index) => {
    if (val[0] === 'f' && val[1] === '-') {
        filePath = val.substr(2);
    }
    if (val[0] === 'r' && val[1] === '-') {
        strRepl = val.substr(2);
    }
    if (val[0] === 'r' && val[1] === 'e' && val[2] === '-') {
        strReg = val.substr(3);
    }
    if (val[0] === '-' && val[1] === 'g') {
        regMod = 'g';
    }
    if (val[0] === '-' && val[1] === 'v') {
        viewOnly = true;
    }
});
console.log('strReg', strReg);
/** -àà
    Not necessary VIA
    strReg = escapeRegExp(strReg)*/
console.log('strReg escaped', strReg);
console.log('strRepl', strRepl);
console.log('filePath', filePath);
var re = new RegExp(strReg, regMod);
console.log('re', re);
fs.readFile(filePath, {
    encoding: 'utf-8'
}, (err,data) => {
    if (err) {
        console.log(err);
        return ;
    }
    console.log('Old content:\n', data);
    var newContent = data.replace(re, strRepl);
    console.log('New content:\n', newContent);
    if (viewOnly) {
        return ;
    }
    fs.writeFile(filePath, newContent, {
        encoding: 'utf-8'
    }, (err,data) => {
        if (err) {
            console.log(err);
            return ;
        }
        console.log('file save');
    })});
