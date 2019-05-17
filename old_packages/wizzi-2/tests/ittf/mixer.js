/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\ittf\mixer.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var ProductionContext = require('../../lib/production/context').ProductionContext;
var LoadContext = require('../../lib/ittf/loadContext').loadContext;
var mixer = require('../../lib/ittf/mixer');
var result_mixedModel,
    node;
describe("the mixer resolves mixin calls and includes/composes called mixins into one tree", function() {
    it("", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'mixer_1.tests.ittf')
        ;
        LoadContext.getLoadStateAsync(content_filepath, {
            modelContext: {}, 
            productionContext: new ProductionContext()
        }, function(err,loadState) {
            var ittfModel = loadState.getPrimaryIttfModel();
            mixer(ittfModel, loadState, function(err,mixedModel) {
                result_mixedModel = mixedModel;
                node = result_mixedModel.nodes[0];
                expect(node.row).to.be.a('number');
                expect(node.row).to.be(1);
                expect(node.col).to.be.a('number');
                expect(node.col).to.be(1);
                expect(node.name).to.be.a('string');
                expect(node.name).to.be('sigma');
                expect(node.value).to.be(undefined);
                node = result_mixedModel.nodes[0].childs[0];
                expect(node.row).to.be.a('number');
                expect(node.row).to.be(1);
                expect(node.col).to.be.a('number');
                expect(node.col).to.be(1);
                expect(node.name).to.be.a('string');
                expect(node.name).to.be('tau');
                expect(node.value).to.be.a('string');
                expect(node.value).to.be('1');
                done();
            });
        });
    });
});
