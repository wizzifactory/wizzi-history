/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\loader\mtreebrick.js.ittf
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
var mocks = require('./mocks/misc');

describe("mTree", function() {
    
    var store;
    
    before(function(done) {
        store = new mocks.IttfDocumentStore();
        store.init({
            storeKind: 'filesystem'
        }, function(err, notUsed) {
            done();
        });
    });
    it("should get an mTreeBrick param values", function(done) {
        MTreeBrickProvider.createFromUri(path.join(__dirname, 'repo', 'data', 'params_1.tests.ittf'), {
            productionContext: mocks.ProductionContext, 
            mTreeBuildUpContext: {}, 
            __ittfDocumentStore: store
        }, function(err, provider) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(provider).to.be.an('object');
            var mTree = provider.getPrimaryMTreeBrick();
            expect(mTree).to.be.an('object');
            var expected = 'alfa, num:integer|9, ok:boolean|true, when:date|2015-8-23, cost:float|9.99';
            expect(mTree.$params).to.be.a('string');
            expect(mTree.$params).to.be(expected);
            var prms = mTree.calcParamValues('pluto');
            expect(prms).to.be.an('array');
            expect(prms.length).to.be(5);
            expect(prms[0].value).to.be.a('string');
            expect(prms[0].value).to.be('pluto');
            expect(prms[1].value).to.be.a('number');
            expect(prms[1].value).to.be(9);
            expect(prms[2].value).to.be(true);
            expected = new Date(2015, 7, 23);
            // loose equality works for objects
            expect(prms[3].value).to.eql(expected);
            expect(prms[4].value).to.be.a('number');
            expect(prms[4].value).to.be(9.99);
            done();
        });
    });
});
