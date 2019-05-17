/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\tests\xmlwizzifier\index.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var thisPackage = require('../../index');

var simpleSource = path.join(__dirname, 'data', 'svg.tests.xml');

describe("the xml wizzifier", function() {
    
    it("should wizzify a xml file", function(done) {
        var ittfExpected = 'module \n    kind jsfile\n    function alfa\n        param beta\n        param gamma\n';
        thisPackage.xmlWizzify(simpleSource, {}, function(err, ittf) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(ittf).to.be.a('string');
            expect(ittf).to.be(ittfExpected);
            done();
        });
    });
});
