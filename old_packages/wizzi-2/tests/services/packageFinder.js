/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\services\packageFinder.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var errors = require('../../lib/ittf/repo/errors');
var packageFinder = require('../../lib/services/packageFinder');
describe("the packageFinder searches and a require a package by name", function() {
    it("should find and require the esprima package", function() {
        var pkg = packageFinder.findNodePackage('esprima', __dirname, true)
        ;
        // log 'pkg', pkg
        expect(pkg).to.be.an('object');
        expect(pkg.version).to.be.an('object');
        expect(pkg.parse).to.be.an('object');
    });
});
