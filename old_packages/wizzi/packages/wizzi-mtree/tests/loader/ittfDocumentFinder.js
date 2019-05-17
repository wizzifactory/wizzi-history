/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\loader\ittfdocumentfinder.js.ittf
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
var IttfDocumentFinder = require('../../lib/loader/ittfDocumentFinder');

describe("ittfDocumentFinder", function() {
    
    var store;
    
    before(function(done) {
        store = new mocks.IttfDocumentStore();
        store.init({
            storeKind: 'filesystem'
        }, function(err, notUsed) {
            done();
        });
    });
    it("should get an IttfNotFound error", function(done) {
        var ittfDocumentFinder = new IttfDocumentFinder(store, 'tests');
        ittfDocumentFinder.resolvePath({
            ittfDocumentUri: path.join(__dirname, 'dummy.tests.ittf')
        }, function(err, result) {
            console.log('should get an IttfNotFound error.err', err);
            expect(err.name).to.be.a('string');
            expect(err.name).to.be('IttfNotFound');
            expect(err.__is_error).to.be(true);
            done();
        });
    });
});
