/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-tools-next\src\ittf\examples\js\babel.js.ittf
    utc time: Tue, 17 Jul 2018 05:35:24 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var file = wizzi.file;
var jswizzifier = require('../../lib/wizzifiers/jsparser/esprima/wizzifier');
var babel = require("@babel/parser");
go('t1');
function go(name) {
    var src = path.join(__dirname, 'data', name + '.js');
    var out_esprima = path.join(__dirname, 'data', name + '.esprima.json');
    var out_ittf = path.join(__dirname, 'data', name + '.js.ittf');
    var out_ittf_js = path.join(__dirname, 'data', name + '.js.ittf.js');
    var parsed = babel.parse(file.read(src), {
        sourceType: 'module', 
        plugins: [
            "jsx", 
            "flow", 
            "objectRestSpread"
        ]
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
}
