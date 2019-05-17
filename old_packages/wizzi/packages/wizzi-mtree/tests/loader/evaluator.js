/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\loader\evaluator.js.ittf
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
var MTreeBrickProvider = require('../../lib/loader/mTreeBrickProvider');
var mixer = require('../../lib/loader/mixer');
var appender = require('../../lib/loader/appender');
var evaluator = require('../../lib/loader/evaluator');

describe("evaluator", function() {
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
    it("should load and evaluate", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'evaluator_1.tests.ittf');
        var loadContext = {
            mTreeBuildUpContext: {}, 
            productionContext: mocks.ProductionContext, 
            __ittfDocumentStore: store
        };
        MTreeBrickProvider.createFromUri(content_filepath, loadContext, function(err, provider) {
            var mTree = provider.getPrimaryMTreeBrick();
            mixer(mTree, provider, function(err, mixedModel) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                appender(mixedModel, function(err, appendedModel) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    evaluator(appendedModel, loadContext, function(err, result) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        evaluatedModel = result;
                        done();
                    });
                });
            });
        });
    });
    it("nodes[0]", function() {
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
        expect(node.n).to.be('test');
    });
    it("nodes [0][0]", function() {
        expect(evaluatedModel.nodes[0].children).to.be.an('array');
        expect(evaluatedModel.nodes[0].children.length).to.be(1);
        node = evaluatedModel.nodes[0].children[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(2);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(5);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('team');
        expect(node.v).to.be.a('string');
        expect(node.v).to.be('INTER');
    });
});
