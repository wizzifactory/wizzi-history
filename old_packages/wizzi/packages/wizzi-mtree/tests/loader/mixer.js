/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\loader\mixer.js.ittf
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

describe("mixer", function() {
    var store,
        result_mixedModel,
        node;
    before(function(done) {
        store = new mocks.IttfDocumentStore();
        store.init({
            storeKind: 'filesystem'
        }, function(err, notUsed) {
            done();
        });
    });
    it("", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'mixer_1.tests.ittf');
        MTreeBrickProvider.createFromUri(content_filepath, {
            mTreeBuildUpContext: {}, 
            productionContext: mocks.ProductionContext, 
            __ittfDocumentStore: store
        }, function(err, provider) {
            var mTree = provider.getPrimaryMTreeBrick();
            mixer(mTree, provider, function(err, mixedModel) {
                result_mixedModel = mixedModel;
                node = result_mixedModel.nodes[0];
                expect(node.row).to.be.a('number');
                expect(node.row).to.be(1);
                expect(node.col).to.be.a('number');
                expect(node.col).to.be(1);
                expect(node.name).to.be.a('string');
                expect(node.name).to.be('sigma');
                expect(node.value).to.be(undefined);
                node = result_mixedModel.nodes[0].children[0];
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
