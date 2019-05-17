/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\ittf\ittfInterpolate.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var util = require('util');
var expect = require('expect.js');
var Context = require('../../lib/esprima/wizziJsContext');
var ip = require('../../lib/ittf/ittfInterpolate');
var errors = require('../../lib/esprima/errors');
var ctx = new Context();
describe("interpolate utility", function() {
    beforeEach(function() {
        ctx.clear();
        ctx.set_GlobalContext();
    });
    it("interpolate a single var", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('My name is $' + '{name}.', ctx);
        console.log('result', result);
        expect(result).to.be.a('string');
        expect(result).to.be('My name is stefi.');
    });
    it("interpolate a single var + an empty var", function() {
        ctx.setValue('name', 'stefi');
        ctx.setValue('hobby', '');
        var result = ip('My name is $' + '{name} and hobby $' + '{hobby}.', ctx);
        console.log('result', result);
        expect(result).to.be.a('string');
        expect(result).to.be('My name is stefi and hobby .');
    });
    it("escaped interpolation", function() {
        ctx.setValue('name', 'stefi');
        ctx.setValue('hobby', 'walking');
        var result = ip('My name is \\$' + '\\{name} and hobby $' + '{hobby}.', ctx);
        console.log('result', result);
        expect(result).to.be.a('string');
        expect(result).to.be('My name is $' + '{name} and hobby walking.');
    });
    it("strange template string", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello *{ $a $ {} a$ ok.', ctx);
        console.log('result', result);
        expect(result).to.be.a('string');
        expect(result).to.be('Hello *{ $a $ {} a$ ok.');
    });
    it("not closed var delimiter", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello ${a', ctx);
        console.log('result', result);
        expect(result).to.be.a('string');
        expect(result).to.be('Hello ${a');
    });
    it("ending dollar", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello $', ctx);
        console.log('result', result);
        expect(result).to.be.a('string');
        expect(result).to.be('Hello $');
    });
    it("double dollar", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello $' + '$ ok', ctx);
        console.log('result', result);
        expect(result).to.be.a('string');
        expect(result).to.be('Hello $' + '$ ok');
    });
    it("interpolated can manage methods on values", function() {
        ctx.setValue('name', 'stefi');
        var result = ip('Hello $' + '{ name.capitalize(); }.', ctx);
        console.log('result', result);
        expect(result).to.be.a('string');
        expect(result).to.be('Hello Stefi.');
    });
});
