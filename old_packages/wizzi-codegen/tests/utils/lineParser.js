/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\tests\utils\lineparser.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var lineparser = require('../../lib/js_v4/util/lineparser');

describe("utils - lineparser", function() {
    it("should parse a simple name value", function() {
        var nv = lineparser.parseNameValueRaw('alpha beta');
        expect(nv.name()).to.be.a('string');
        expect(nv.name()).to.be('alpha');
        expect(nv.value()).to.be.a('string');
        expect(nv.value()).to.be('beta');
    });
    it("should parse a simple name and a quoted value", function() {
        var nv = lineparser.parseNameValueRaw('alpha "beta 2"');
        expect(nv.name()).to.be.a('string');
        expect(nv.name()).to.be('alpha');
        expect(nv.value()).to.be.a('string');
        expect(nv.value()).to.be('beta 2');
    });
    it("should parse a quoted name and a quoted value", function() {
        var nv = lineparser.parseNameValueRaw('"alpha 1" "beta 2"');
        expect(nv.name()).to.be.a('string');
        expect(nv.name()).to.be('alpha 1');
        expect(nv.value()).to.be.a('string');
        expect(nv.value()).to.be('beta 2');
    });
    it("should parse a quoted name and a simple value", function() {
        var nv = lineparser.parseNameValueRaw("' ' tokenType.Space");
        expect(nv.name()).to.be.a('string');
        expect(nv.name()).to.be(' ');
        expect(nv.value()).to.be.a('string');
        expect(nv.value()).to.be('tokenType.Space');
    });
});
