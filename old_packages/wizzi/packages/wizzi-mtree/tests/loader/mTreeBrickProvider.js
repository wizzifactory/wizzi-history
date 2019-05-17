/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\loader\mtreebrickprovider.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var MTreeBrickProvider = require('../../lib/loader/mTreeBrickProvider');
var errors = require('../../lib/errors');
var mocks = require('./mocks/misc');

describe("mTreeBrickProvider", function() {
    
    var store;
    
    before(function(done) {
        store = new mocks.IttfDocumentStore();
        store.init({
            storeKind: 'filesystem'
        }, function(err, notUsed) {
            done();
        });
    });
    it("should get a protocol error", function(done) {
        MTreeBrickProvider.createFromUri('alfa.txt', {
            productionContext: mocks.ProductionContext, 
            mTreeBuildUpContext: {}, 
            __ittfDocumentStore: store
        }, function(err, content) {
            expect(err.name).to.be('InvalidRequestError');
            expect(err.code).to.be('UriError');
            done();
        });
    });
    it("should get a uri error", function(done) {
        MTreeBrickProvider.createFromUri('http://alpha.txt', {
            productionContext: mocks.ProductionContext, 
            mTreeBuildUpContext: {}, 
            __ittfDocumentStore: store
        }, function(err, content) {
            expect(err.name).to.be('InvalidRequestError');
            expect(err.code).to.be('UriError');
            done();
        });
    });
    it("should get an invalid request error", function(done) {
        MTreeBrickProvider.createFromUri('repo://alpha.txt', {
            productionContext: mocks.ProductionContext, 
            mTreeBuildUpContext: {}, 
            __ittfDocumentStore: store
        }, function(err, content) {
            expect(err.name).to.be('InvalidRequestError');
            done();
        });
    });
    it("should get a RepoIOError (NotFound)", function(done) {
        MTreeBrickProvider.createFromUri(path.join(__dirname, 'dummy', 'alpha.txt'), {
            productionContext: mocks.ProductionContext, 
            mTreeBuildUpContext: {}, 
            __ittfDocumentStore: store
        }, function(err, content) {
            expect(err.name).to.be('RepoIOError');
            done();
        });
    });
    it("should load the raw MTreeBrick", function(done) {
        MTreeBrickProvider.createFromUri(path.join(__dirname, 'repo', 'data', 'doc1.tests.ittf'), {
            productionContext: mocks.ProductionContext, 
            mTreeBuildUpContext: {}, 
            __ittfDocumentStore: store
        }, function(err, provider) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            // log 'err, provider', err, provider
            expect(provider).to.be.an('object');
            var mTreeBrick = provider.getPrimaryMTreeBrick();
            expect(mTreeBrick).to.be.an('object');
            expect(mTreeBrick.$schema).to.be('tests');
            expect(mTreeBrick.sourceKey).to.be('f1');
            expect(mTreeBrick.brickKey).to.be('f1');
            expect(mTreeBrick.nodes).to.be.an('array');
            expect(mTreeBrick.nodes[0]).to.be.an('object');
            expect(mTreeBrick.nodes[0].name).to.be('tests');
            expect(mTreeBrick.nodes[0].value).to.be('School');
            expect(mTreeBrick.nodes[0].children).to.be.an('array');
            expect(mTreeBrick.nodes[0].children.length).to.be(3);
            var loadHistory = provider.loadHistory;
            expect(loadHistory).to.be.an('object');
            done();
        });
    });
    it("should load the raw mTreeBrick", function(done) {
        MTreeBrickProvider.createFromUri(path.join(__dirname, 'repo', 'data', 'doc1.tests.ittf'), {
            productionContext: mocks.ProductionContext, 
            mTreeBuildUpContext: {}, 
            __ittfDocumentStore: store
        }, function(err, provider) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            // log 'err, provider', err, provider
            expect(provider).to.be.an('object');
            provider.get({
                from: 'store', 
                basedir: path.join(__dirname, 'repo', 'data'), 
                relpath: 'frag1.tests.ittf'
            }, function(err, mTreeBrick) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                // log 'err, mTreeBrick', err, mTreeBrick
                expect(mTreeBrick).to.be.an('object');
                expect(mTreeBrick.$schema).to.be('tests');
                expect(mTreeBrick.nodes).to.be.an('array');
                expect(mTreeBrick.nodes[0]).to.be.an('object');
                expect(mTreeBrick.nodes[0].name).to.be('property');
                expect(mTreeBrick.nodes[0].value).to.be('Nemo');
                done();
            });
        });
    });
});
