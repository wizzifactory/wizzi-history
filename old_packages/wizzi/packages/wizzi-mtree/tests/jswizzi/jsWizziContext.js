/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\jswizzi\jswizzicontext.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var JsWizziContext = require('../../lib/jswizzi/jsWizziContext');
var ctx = new JsWizziContext();

describe("jsWizziContext", function() {
    it("should declare a function", function() {
        ctx.declareFunction('f1', {});
        var f = ctx.getFunction('f1');
        expect(f.__is_function).to.be(true);
    });
    it("should set a function to a var", function() {
        ctx.declareFunction('f1', {});
        ctx.setValue('pointF1', ctx.getValue('f1'));
        var f = ctx.getFunction('pointF1');
        expect(f.__is_function).to.be(true);
    });
});
