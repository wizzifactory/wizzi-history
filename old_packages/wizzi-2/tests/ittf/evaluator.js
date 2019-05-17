/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\ittf\evaluator.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var ProductionContext = require('../../lib/production/context').ProductionContext;
var LoadContext = require('../../lib/ittf/loadContext').loadContext;
var mixer = require('../../lib/ittf/mixer');
var appender = require('../../lib/ittf/appender');
var evaluator = require('../../lib/ittf/evaluator');
var evaluatedModel,
    node;
describe("the evaluator computes the tree structure of the ittf model and the expressions on node values", function() {
    before(function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'evaluator_1.tests.ittf')
        ;
        var requestContext = {
            modelContext: {}, 
            productionContext: new ProductionContext()
        };
        LoadContext.getLoadStateAsync(content_filepath, requestContext, function(err,loadState) {
            var ittfModel = loadState.getPrimaryIttfModel();
            mixer(ittfModel, loadState, function(err,mixedModel) {
                appender(mixedModel, function(err,appendedModel) {
                    evaluator(appendedModel, requestContext, function(err,result) {
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
        expect(evaluatedModel.nodes[0].childs).to.be.an('array');
        expect(evaluatedModel.nodes[0].childs.length).to.be(1);
        node = evaluatedModel.nodes[0].childs[0];
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
