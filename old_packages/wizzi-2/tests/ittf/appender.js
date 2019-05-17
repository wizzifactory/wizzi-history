/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\ittf\appender.js.ittf
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
                appender(mixedModel, function(err,result) {
                    appendedModel = result;
                    done();
                });
            });
        });
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
