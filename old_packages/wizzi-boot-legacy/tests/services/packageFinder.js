// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:27 GMT
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
