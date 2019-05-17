// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:24 GMT
'use strict';
var util = require('util');
var expect = require('expect.js');
var Context = require('../../lib/esprima/wizziJsContext');
var runner = require('../../lib/esprima/wizziJsRunner');
var errors = require('../../lib/esprima/errors');
var ctx = new Context();
describe("runner variables declaration", function() {
    it("declare undefined", function() {
        ctx.clear();
        runner.run([
            'var a;'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('a')).to.be(undefined);
    });
    it("declare number", function() {
        ctx.clear();
        runner.run([
            'var a = 10;'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('a')).to.be.a('number');
        expect(ctx.getValue('a')).to.be(10);
    });
    it("declare string", function() {
        ctx.clear();
        runner.run([
            'var a = "hello";'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('a')).to.be.a('string');
        expect(ctx.getValue('a')).to.be("hello");
    });
    it("declare boolean", function() {
        ctx.clear();
        runner.run([
            'var a = true;'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('a')).to.be.a('boolean');
        expect(ctx.getValue('a')).to.be(true);
    });
    it("declare undefined and string in single var", function() {
        ctx.clear();
        runner.run([
            'var x, a = "hello";'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('x')).to.be(undefined);
        expect(ctx.getValue('a')).to.be.a('string');
        expect(ctx.getValue('a')).to.be("hello");
    });
    it("declare empty object", function() {
        ctx.clear();
        runner.run([
            'var a = {};'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('a')).to.be.an('object');
    });
});
describe("runner object expressions", function() {
    it("declare empty object", function() {
        ctx.clear();
        runner.run([
            'var obj = {};'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj')).to.be.an('object');
    });
    it("declare an object with 1 numeric property", function() {
        ctx.clear();
        runner.run([
            'var obj = { p1: 10 };'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj')).to.be.an('object');
        expect(ctx.getValue('obj').p1).to.be.a('number');
        expect(ctx.getValue('obj').p1).to.be(10);
    });
    it("declare an object with 1 string property", function() {
        ctx.clear();
        runner.run([
            'var obj = { p1: "nemo" };'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj')).to.be.an('object');
        expect(ctx.getValue('obj').p1).to.be.a('string');
        expect(ctx.getValue('obj').p1).to.be('nemo');
    });
    it("declare objects with 1 empty array property", function() {
        ctx.clear();
        runner.run([
            'var obj = { p1: [] };'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj')).to.be.an('object');
        expect(ctx.getValue('obj').p1).to.be.an('array');
    });
    it("declare objects with 1 array property", function() {
        ctx.clear();
        runner.run([
            'var obj1 = { p1: [] };', 
            'var obj = { p1: [1, 2, 3] };'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj')).to.be.an('object');
        expect(ctx.getValue('obj').p1).to.be.an('array');
        expect(ctx.getValue('obj').p1[0]).to.be(1);
        expect(ctx.getValue('obj').p1[1]).to.be(2);
        expect(ctx.getValue('obj').p1[2]).to.be(3);
    });
    it("declare a nidified object 3 levels", function() {
        ctx.clear();
        runner.run([
            'var obj = { p1: { p1_a: { p1_a_1 : "hello" } } };'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj')).to.be.an('object');
        expect(ctx.getValue('obj').p1).to.be.an('object');
        expect(ctx.getValue('obj').p1.p1_a).to.be.a('object');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_1).to.be.an('string');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_1).to.be('hello');
    });
    it("declare a nidified object 3 levels multiproperty", function() {
        ctx.clear();
        runner.run([
            'var obj = { p1: { p1_a: { p1_a_1 : "hello", p1_a_2 : 30 }, p1_b: "stefi" }, p2: "annie" };'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj')).to.be.an('object');
        expect(ctx.getValue('obj').p1).to.be.an('object');
        expect(ctx.getValue('obj').p1.p1_a).to.be.an('object');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_1).to.be.a('string');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_1).to.be('hello');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_2).to.be(30);
        expect(ctx.getValue('obj').p1.p1_b).to.be('stefi');
        expect(ctx.getValue('obj').p2).to.be('annie');
    });
    it("declare a nidified object 3 levels array multiproperty", function() {
        ctx.clear();
        runner.run([
            'var obj = {', 
            '	p1: {', 
            '		   p1_a: {', 
            '			  p1_a_array :', 
            '				[', 
            '				  { x : "hello", y : 30 },', 
            '				  { x: "stefi" } ', 
            '				] ', 
            '			}, ', 
            '		   p1_b: "annie"', 
            '		}', 
            '};'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj')).to.be.an('object');
        expect(ctx.getValue('obj').p1).to.be.an('object');
        expect(ctx.getValue('obj').p1.p1_a).to.be.an('object');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_array).to.be.an('array');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_array[0]).to.be.an('object');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_array[1]).to.be.an('object');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_array[0].x).to.be.a('string');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_array[0].x).to.be('hello');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_array[0].y).to.be.a('number');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_array[0].y).to.be(30);
        expect(ctx.getValue('obj').p1.p1_a.p1_a_array[1].x).to.be.a('string');
        expect(ctx.getValue('obj').p1.p1_a.p1_a_array[1].x).to.be('stefi');
    });
});
describe("runner object member access set/get operations", function() {
    it("declare and set an object property 1 level", function() {
        ctx.clear();
        runner.run([
            'var obj = {};', 
            'obj.p1 = 10;', 
            'var x = obj.p1;'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj').p1).to.be.a('number');
        expect(ctx.getValue('obj').p1).to.be(10);
        expect(ctx.getValue('x') ).to.be.a('number');
        expect(ctx.getValue('x') ).to.be(10);
    });
    it("declare and set an object property 2 level", function() {
        ctx.clear();
        runner.run([
            'var obj = {};', 
            'obj.p1 = {};', 
            'obj.p1.alfa = 10;', 
            'var x = obj.p1.alfa;'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj').p1.alfa).to.be.a('number');
        expect(ctx.getValue('obj').p1.alfa).to.be(10);
        expect(ctx.getValue('x') ).to.be.a('number');
        expect(ctx.getValue('x') ).to.be(10);
    });
    it("declare and set an object property 3 level", function() {
        ctx.clear();
        runner.run([
            'var obj = {};', 
            'obj.p1 = {};', 
            'obj.p1.alfa = {};', 
            'obj.p1.alfa.gamma = 10;', 
            'var x = obj.p1.alfa.gamma;'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('obj').p1.alfa.gamma).to.be.a('number');
        expect(ctx.getValue('obj').p1.alfa.gamma).to.be(10);
        expect(ctx.getValue('x') ).to.be.a('number');
        expect(ctx.getValue('x') ).to.be(10);
    });
});
describe("runner array member access set/get operations", function() {
    it("declare and set an object property 1 level", function() {
        ctx.clear();
        runner.run([
            'var arr = [];', 
            'arr[0] = 10;', 
            'var x = arr[0];'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('arr')[0]).to.be.a('number');
        expect(ctx.getValue('arr')[0]).to.be(10);
        expect(ctx.getValue('x') ).to.be.a('number');
        expect(ctx.getValue('x') ).to.be(10);
    });
    it("declare and set an object property 2 level", function() {
        ctx.clear();
        runner.run([
            'var arr = [];', 
            'arr[0] = [];', 
            'arr[0][0] = 10;', 
            'var x = arr[0][0];'
        ].join('\n'), ctx, {
            dumpfile: null
        });
        expect(ctx.getValue('arr')[0][0]).to.be.a('number');
        expect(ctx.getValue('arr')[0][0]).to.be(10);
        expect(ctx.getValue('x') ).to.be.a('number');
        expect(ctx.getValue('x') ).to.be(10);
    });
});
