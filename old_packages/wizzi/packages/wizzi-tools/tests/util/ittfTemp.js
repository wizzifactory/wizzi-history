/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\tests\util\ittfTemp.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var ittfTemp = require('../../lib/util/ittfTemp');

describe("the ittfTemp class", function() {
    
    it("should build in memory and write an ittf", function(done) {
        var ittfExpected = 'html\n\thead\n\tbody\n\t\tdiv\n\t\t\tstyle margin: 10px;';
        var ittf = new ittfTemp('html');
        var n1 = ittf.add('head');
        var n2 = ittf.add('body');
        var n2a = n2.add('div');
        var n2a1 = n2a.add('style', 'margin: 10px;');
        ittf.writeFile(path.join(__dirname, 'outputs', 'test.html.ittf'), function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            done();
        });
    });
});
