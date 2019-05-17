/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\loader\function.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var mocks = require('./mocks/misc');
var mTreeLoader = require('./mocks/mTreeLoader');

describe("function", function() {
    var store,
        evaluatedModel,
        node;
    before(function(done) {
        store = new mocks.IttfDocumentStore();
        store.init({
            storeKind: 'filesystem'
        }, function(err, notUsed) {
            done();
        });
    });
    it("should load and evaluate an ittf with a function", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'function_1.tests.ittf');
        mTreeLoader(store, content_filepath, function(err, result) {
            evaluatedModel = result;
            expect(evaluatedModel).to.be.an('object');
            expect(evaluatedModel.nodes).to.be.an('array');
            expect(evaluatedModel.nodes.length).to.be(1);
            done();
        });
    });
    it("nodes[0]", function(done) {
        expect(evaluatedModel).to.be.an('object');
        expect(evaluatedModel.nodes).to.be.an('array');
        expect(evaluatedModel.nodes.length).to.be(1);
        expect(evaluatedModel.nodes[0]).to.be.an('object');
        node = evaluatedModel.nodes[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(1);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(1);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('alfa');
        done();
    });
    it("nodes [0][0]", function(done) {
        expect(evaluatedModel.nodes[0].children).to.be.an('array');
        expect(evaluatedModel.nodes[0].children.length).to.be(1);
        node = evaluatedModel.nodes[0].children[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(4);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(9);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('beta');
        expect(node.v).to.be.a('string');
        expect(node.v).to.be('stefi');
        done();
    });
    it("should load and evaluate an ittf with a complex function", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'function_2.tests.ittf');
        mTreeLoader(store, content_filepath, function(err, result) {
            evaluatedModel = result;
            expect(evaluatedModel).to.be.an('object');
            expect(evaluatedModel.nodes).to.be.an('array');
            expect(evaluatedModel.nodes.length).to.be(1);
            done();
        });
    });
    it("complex function nodes[0]", function(done) {
        expect(evaluatedModel).to.be.an('object');
        expect(evaluatedModel.nodes).to.be.an('array');
        expect(evaluatedModel.nodes.length).to.be(1);
        expect(evaluatedModel.nodes[0]).to.be.an('object');
        node = evaluatedModel.nodes[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(1);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(1);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('alfa');
        done();
    });
    it("complex function nodes [0][0]", function(done) {
        console.log('evaluatedModel.nodes[0].children', evaluatedModel.nodes[0].children);
        expect(evaluatedModel.nodes[0].children).to.be.an('array');
        expect(evaluatedModel.nodes[0].children.length).to.be(2);
        node = evaluatedModel.nodes[0].children[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(2);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(5);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('beta');
        node = evaluatedModel.nodes[0].children[1];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(7);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(5);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('gamma');
        node = evaluatedModel.nodes[0].children[1].children[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(5);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(9);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('sigma');
        done();
    });
    it("should load and evaluate an ittf with a recursive function", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'function_3.tests.ittf');
        mTreeLoader(store, content_filepath, function(err, result) {
            console.log('================', err, result);
            evaluatedModel = result;
            expect(evaluatedModel).to.be.an('object');
            expect(evaluatedModel.nodes).to.be.an('array');
            expect(evaluatedModel.nodes.length).to.be(1);
            done();
        });
    });
    it("recursive nodes[0]", function(done) {
        node = evaluatedModel.nodes[0];
        expect(node).to.be.an('object');
        expect(node.children).to.be.an('array');
        expect(node.children.length).to.be(1);
        expect(node.children[0]).to.be.an('object');
        var n1 = node.children[0];
        expect(n1.r).to.be.a('number');
        expect(n1.r).to.be(22);
        expect(n1.c).to.be.a('number');
        expect(n1.c).to.be(9);
        expect(n1.n).to.be.a('string');
        expect(n1.n).to.be('giove');
        expect(n1.v).to.be.a('string');
        expect(n1.v).to.be('alfa x');
        done();
    });
    it("recursive nodes[0][0][0]", function(done) {
        node = evaluatedModel.nodes[0].children[0].children[0];
        expect(node).to.be.an('object');
        expect(node.children).to.be.an('array');
        expect(node.children.length).to.be(1);
        expect(node.children[0]).to.be.an('object');
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(22);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(9);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('giove');
        expect(node.v).to.be.a('string');
        expect(node.v).to.be('beta y');
        var n1 = node.children[0];
        expect(n1.r).to.be.a('number');
        expect(n1.r).to.be(22);
        expect(n1.c).to.be.a('number');
        expect(n1.c).to.be(9);
        expect(n1.n).to.be.a('string');
        expect(n1.n).to.be('giove');
        expect(n1.v).to.be.a('string');
        expect(n1.v).to.be('sigma t');
        done();
    });
    it("recursive nodes[0][0][1]", function(done) {
        node = evaluatedModel.nodes[0].children[0].children[1];
        expect(node).to.be.an('object');
        expect(node.children).to.be.an('array');
        expect(node.children.length).to.be(0);
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(22);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(9);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('giove');
        expect(node.v).to.be.a('string');
        expect(node.v).to.be('gamma z');
        done();
    });
});
