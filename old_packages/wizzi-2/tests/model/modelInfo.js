/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\model\modelInfo.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var stringify = require('json-stringify-safe');
var file = require('../../lib/util/file');
var ModelInfo = require('../../lib/model/modelInfo').ModelInfo;
var mocks = require('./mocks');
var CWD = path.join(__dirname, 'ittf');
var fileContent = file.read(path.join(CWD, 'examples', 'script.test.js.ittf')
)
;
var modelInfoInstance;
describe("a modelInfo with a single source file", function() {
    before(function() {
        modelInfoInstance = new ModelInfo({
            cwd: null, 
            src: path.join(CWD, 'examples', 'script.test.js.ittf')
            , 
            schema: 'js', 
            contexts: []
        });
        modelInfoInstance.productionManager(mocks.createPmanForPackage('wizzi', CWD)
        );
    });
    it("should test exists", function(done) {
        modelInfoInstance.exists(function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be(true);
            done();
        });
    });
    it("should test isFile", function(done) {
        modelInfoInstance.isFile(function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be(true);
            done();
        });
    });
    it("should test isDirectory", function(done) {
        modelInfoInstance.isDirectory(function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be(false);
            done();
        });
    });
    it("should test getSource", function(done) {
        modelInfoInstance.getSource(function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be.a('string');
            expect(result).to.be(fileContent);
            console.log('getSource', result);
            done();
        });
    });
});
describe("a modelInfo with multiple source files", function() {
    before(function() {
        modelInfoInstance = new ModelInfo({
            cwd: null, 
            src: path.join(CWD, 'examples/**/*.js.ittf')
            , 
            schema: 'js', 
            contexts: [
                {
                    cwd: null, 
                    src: path.join(CWD, 'examples', 'simple.wftest.ittf')
                    , 
                    schema: 'wftest', 
                    contexts: []
                }
            ]
        });
        modelInfoInstance.productionManager(mocks.createPmanForPackage('wizzi', CWD)
        );
    });
    it("should test exists", function(done) {
        modelInfoInstance.exists(function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be(true);
            done();
        });
    });
    it("should test isFile", function(done) {
        modelInfoInstance.isFile(function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be(false);
            done();
        });
    });
    it("should test isDirectory", function(done) {
        modelInfoInstance.isDirectory(function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be(true);
            done();
        });
    });
    it("should test getFiles", function(done) {
        modelInfoInstance.getFiles({
            final: true
        }, function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be(2);
            console.log('getFiles', result);
            done();
        });
    });
    it("should test getSources", function(done) {
        modelInfoInstance.getSources(function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be(2);
            console.log('getSources', result);
            done();
        });
    });
});
