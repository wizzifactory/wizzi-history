/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\examples\typescript\index.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var file = require('wizzi-utils').file;
var jswizzifier = require('../../lib/wizzifiers/jsparser/babel/wizzifier');
go('quick');
function go(name) {
    var src = path.join(__dirname, 'data', name + '.ts');
    var out_babel = path.join(__dirname, 'data', name + '.babel.json');
    var out_ittf = path.join(__dirname, 'data', name + '.js.ittf');
    var out_ittf_js = path.join(__dirname, 'data', name + '.js.ittf.js');
    jswizzifier.getWizziIttf(file.read(src), {
        kind: 'react', 
        babel: {
            sourceType: 'module', 
            ts_or_flow: 'typescript'
        }, 
        syntaxOutFile: out_babel, 
        verbose: false
    }, function(err, result) {
        if (err) {
            console.log('err', err);
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
