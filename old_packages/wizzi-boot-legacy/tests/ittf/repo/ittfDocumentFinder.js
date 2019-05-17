// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:26 GMT
'use strict';

var path = require('path');
var del = require('del');

var expect = require('expect.js');
var IttfDocumentStore = require('../../../lib/ittf/repo/ittfDocumentStore');
var IttfDocumentFinder = require('../../../lib/ittf/repo/ittfDocumentFinder');
var errors = require('../../../lib/ittf/repo/errors');

var store = new IttfDocumentStore;
var finder;

describe("using the IttfDocumentFinder to locate documents and load the text content", function() {
    before(function(done) {
        del.sync([__dirname + '/dummy/**'], {
            force: true
        })
        store.init({
            storeKind: 'filesystem'
        }, function(err,result) {
            console.log('err, result', err, result);
            finder = new IttfDocumentFinder(store);
            done();
        })
    });
    it("should get an invalid path error", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: null, 
            relpath: null
        }, function(err,foundUri) {
            expect(err.name).to.be('InvalidRequestError');
            expect(err.code).to.be('InvalidPath');
            done();
        })
    });
    it("should get an invalid path error", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: null, 
            relpath: '/ass.fidanken.ittf'
        }, function(err,foundUri) {
            expect(err.name).to.be('InvalidRequestError');
            expect(err.code).to.be('InvalidPath');
            done();
        })
    });
    it("should get an invalid path error", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: null, 
            relpath: 'ass.fidanken.ittf'
        }, function(err,foundUri) {
            expect(err.name).to.be('InvalidRequestError');
            expect(err.code).to.be('InvalidPath');
            done();
        })
    });
    it("should get an invalid path error", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: '/hello', 
            relpath: null
        }, function(err,foundUri) {
            expect(err.name).to.be('InvalidRequestError');
            expect(err.code).to.be('InvalidPath');
            done();
        })
    });
    it("should get a valid uri", function(done) {
        finder.resolvePath({
            ittfDocumentUri: path.join(__dirname, 'data', 'doc1.tests.ittf')
            , 
            include: false, 
            includerModelKey: null, 
            basedir: null, 
            relpath: null
        }, function(err,foundUri) {
            expect(err).to.be(null);
            expect(foundUri).to.be.a('string');
            done();
        })
    });
    it("should get a valid uri for a call to a down t fragment", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: path.join(__dirname, 'data')
            , 
            relpath: 'frag1.tests.ittf'
        }, function(err,foundUri) {
            expect(err).to.be(null);
            expect(foundUri).to.be.a('string');
            done();
        })
    });
    it("should get a valid uri for a call to an up t fragment", function(done) {
        finder.resolvePath({
            ittfDocumentUri: null, 
            include: false, 
            includerModelKey: null, 
            basedir: path.join(__dirname, 'data', 'sub', 'sub')
            , 
            relpath: 'frag2.tests.ittf'
        }, function(err,foundUri) {
            expect(err).to.be(null);
            expect(foundUri).to.be.a('string');
            done();
        })
    });
});
