/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\ittf\ittfModelProvider.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var del = require('del');

var expect = require('expect.js');
var IttfModelProvider = require('../../lib/ittf/ittfModelProvider');
var errors = require('../../lib/errors');
var mocks = require('./mocks/misc');

describe("using IttfModelProvider to load IttfModels", function() {
    before(function() {
        del.sync([__dirname + '/dummy/**'], {
            force: true
        });
    });
    it("should get a protocol error", function(done) {
        IttfModelProvider.createFromUri('alfa.txt', {
            productionContext: mocks.ProductionContext, 
            modelContext: {}
        }, function(err,content) {
            expect(err.name).to.be('InvalidRequestError');
            expect(err.code).to.be('ProtocolError');
            done();
        });
    });
    it("should get a protocol error", function(done) {
        IttfModelProvider.createFromUri('http://alpha.txt', {
            productionContext: mocks.ProductionContext, 
            modelContext: {}
        }, function(err,content) {
            expect(err.name).to.be('InvalidRequestError');
            expect(err.code).to.be('ProtocolError');
            done();
        });
    });
    it("should get a not implemented error", function(done) {
        IttfModelProvider.createFromUri('repo://alpha.txt', {
            productionContext: mocks.ProductionContext, 
            modelContext: {}
        }, function(err,content) {
            expect(err.name).to.be('NotImplementedError');
            done();
        });
    });
    it("should get a RepoIOError (NotFound)", function(done) {
        IttfModelProvider.createFromUri(path.join(__dirname, 'dummy', 'alpha.txt')
        , {
            productionContext: mocks.ProductionContext, 
            modelContext: {}
        }, function(err,content) {
            expect(err.name).to.be('RepoIOError');
            done();
        });
    });
    it("should load the raw IttfModel", function(done) {
        IttfModelProvider.createFromUri(path.join(__dirname, 'repo', 'data', 'doc1.tests.ittf')
        , {
            productionContext: mocks.ProductionContext, 
            modelContext: {}
        }, function(err,provider) {
            // log 'err, provider', err, provider
            expect(provider).to.be.an('object');
            var ittfModel = provider.getPrimaryIttfModel();
            expect(ittfModel).to.be.an('object');
            expect(ittfModel.$schema).to.be('tests');
            expect(ittfModel.sourceKey).to.be('f1');
            expect(ittfModel.modelKey).to.be('f1');
            expect(ittfModel.nodes).to.be.an('array');
            expect(ittfModel.nodes[0]).to.be.an('object');
            expect(ittfModel.nodes[0].name).to.be('tests');
            expect(ittfModel.nodes[0].value).to.be('School');
            expect(ittfModel.nodes[0].childs).to.be.an('array');
            expect(ittfModel.nodes[0].childs.length).to.be(3);
            var loadContext = provider.loadContext;
            expect(loadContext).to.be.an('object');
            done();
        });
    });
    it("should load the raw IttfModel", function(done) {
        IttfModelProvider.createFromUri(path.join(__dirname, 'repo', 'data', 'doc1.tests.ittf')
        , {
            productionContext: mocks.ProductionContext, 
            modelContext: {}
        }, function(err,provider) {
            // log 'err, provider', err, provider
            expect(provider).to.be.an('object');
            provider.get({
                from: 'store', 
                basedir: path.join(__dirname, 'repo', 'data')
                , 
                relpath: 'frag1.tests.ittf'
            }, function(err,ittfModel) {
                // log 'err, ittfModel', err, ittfModel
                expect(ittfModel).to.be.an('object');
                expect(ittfModel.$schema).to.be('tests');
                expect(ittfModel.nodes).to.be.an('array');
                expect(ittfModel.nodes[0]).to.be.an('object');
                expect(ittfModel.nodes[0].name).to.be('property');
                expect(ittfModel.nodes[0].value).to.be('Nemo');
                done();
            });
        });
    });
});
