// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:24 GMT
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var ProductionContext = require('../../lib/production/context');
var LoadContext = require('../../lib/ittf/loadContext');
var mixer = require('../../lib/ittf/mixer');
var appender = require('../../lib/ittf/appender');
var appendedModel,
    node;
describe("the appender resolves $group, $hook [name], $append [name] commands", function() {
    before(function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'appender_1.tests.ittf')
        ;
        LoadContext.getLoadStateAsync(content_filepath, {
            modelContext: {}, 
            productionContext: new ProductionContext()
        }, function(err,loadState) {
            var ittfModel = loadState.getPrimaryIttfModel();
            mixer(ittfModel, loadState, function(err,mixedModel) {
                appendedModel = appender(mixedModel);
                done();
            });
        })
    });
    it("nodes[0]", function() {
        expect(appendedModel).to.be.an('object');
        expect(appendedModel.nodes).to.be.an('array');
        expect(appendedModel.nodes.length).to.be(1);
        expect(appendedModel.nodes[0]).to.be.an('object');
        node = appendedModel.nodes[0];
        expect(node.row).to.be.a('number');
        expect(node.row).to.be(1);
        expect(node.col).to.be.a('number');
        expect(node.col).to.be(1);
        expect(node.name).to.be.a('string');
        expect(node.name).to.be('root');
    });
    it("nodes [0][0]", function() {
        expect(appendedModel.nodes[0].childs).to.be.an('array');
        expect(appendedModel.nodes[0].childs.length).to.be(1);
        node = appendedModel.nodes[0].childs[0];
        expect(node.row).to.be.a('number');
        expect(node.row).to.be(1);
        expect(node.col).to.be.a('number');
        expect(node.col).to.be(1);
        expect(node.name).to.be.a('string');
        expect(node.name).to.be('leaf');
        expect(node.value).to.be.a('string');
        expect(node.value).to.be('1');
    });
});
