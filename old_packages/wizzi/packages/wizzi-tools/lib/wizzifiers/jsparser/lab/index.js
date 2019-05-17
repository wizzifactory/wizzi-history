/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-tools-next\src\ittf\lib\wizzifiers\jsparser\lab\index.js.ittf
    utc time: Sat, 16 Jun 2018 04:20:47 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var esprima = require('esprima');
var wizzi = require('wizzi');
var file = wizzi.file;
var jswizzifier = require('../../jsparser/esprima/wizzifier');
go('t1');
function go(name) {
    var src = path.join(__dirname, 'data', name + '.js');
    var out_esprima = path.join(__dirname, 'data', name + '.esprima.json');
    var out_ittf = path.join(__dirname, 'data', name + '.js.ittf');
    var out_ittf_js = path.join(__dirname, 'data', name + '.js.ittf.js');
    var parsed = esprima.parse(file.read(src), {
        sourceType: 'module', 
        jsx: true
    });
    file.write(out_esprima, JSON.stringify(parsed, null, 4));
    jswizzifier.getWizziIttf(file.read(src), {
        kind: 'react', 
        esprima: {
            sourceType: 'module'
        }
    }, function(err, result) {
        if (err) {
            file.write(out_ittf, JSON.stringify(err, null, 4));
        }
        else {
            var r1 = result.substring(0, 24);
            var r2 = result.substring(24);
            console.log('r1', r1);
            r1 = r1.replace('jsfile', 'react ');
            console.log('r1 after', r1);
            file.write(out_ittf, r1+r2);
        }
    });
    wizzi.jsModule(out_ittf, {}, function(err, result) {
        if (err) {
            file.write(out_ittf_js, JSON.stringify(err, null, 4));
        }
        else {
            file.write(out_ittf_js, result);
        }
    });
}
