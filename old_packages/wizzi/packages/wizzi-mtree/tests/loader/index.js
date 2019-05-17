/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\loader\index.js.ittf
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
var file = require('wizzi-utils').file;
var stringify = require('json-stringify-safe');
var loader = require('../../lib/loader');

describe("index", function() {
    var result;
    var store;
    before(function(done) {
        store = new mocks.IttfDocumentStore();
        store.init({
            storeKind: 'filesystem'
        }, function(err, notUsed) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            done();
        });
    });
    it("should load an mTree", function(done) {
        loader.loadMTree(path.join(__dirname, 'repo', 'data', 'ittf_object_args.tests.ittf'), {
            mTreeBuildUpContext: {
                items: [
                    {
                        name: 'stefi', 
                        value: 60
                    }, 
                    {
                        name: 'annie', 
                        value: 59
                    }, 
                    {
                        name: 'afro', 
                        value: 98
                    }
                ]
            }, 
            __productionManager: mocks.ProductionManager, 
            __ittfDocumentStore: store
        }, function(err, mTree) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            result = mTree;
            expect(result).to.be.an('object');
            file.write(path.join(__dirname, 'repo', 'data', 'ittf_object_args.json'), stringify(mTree, null, 2));
            done();
        });
    });
    it("should get a NotFoundError", function(done) {
        loader.loadMTree(path.join(__dirname, 'repo', 'data', 'dummy.tests.ittf'), {
            __productionManager: mocks.ProductionManager, 
            __ittfDocumentStore: store
        }, function(err, result) {
            console.log('should get an RepoIOError error.err', err);
            expect(err.name).to.be.a('string');
            expect(err.name).to.be('RepoIOError');
            done();
        });
    });
});
