/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\tests\model\modelinfo.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var wizziFactory = require('../../lib/services/wizziFactory');
var modelInfo = require('../../lib/model/modelInfo').ModelInfo;
var mocks = require('../mocks/misc');

describe("modelInfo", function() {
    var mi = null;
    before(function(done) {
        wizziFactory.createFactory({
            repo: {
                storeKind: 'filesystem'
            }, 
            plugins: {
                items: [
                    '../mocks/plugin'
                ], 
                pluginsBaseFolder: __dirname
            }, 
            test: {
                testOnlyMockBaseDir: __dirname
            }
        }, function(err, wf) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            var pman = wf.createProductionManager({
                indentSpaces: 4, 
                basedir: __dirname
            }, {});
            mi = new modelInfo({
                cwd: path.join(__dirname, 'ittf'), 
                src: 'mock1.tests.ittf', 
                schema: 'tests'
            });
            mi.productionManager(pman);
            done();
        });
    });
    it("should check some properties", function() {
        var s1Path = path.join(__dirname, 'ittf', 'mock1.tests.ittf');
        var s1PathIgnore = path.join(__dirname, 'ittf');
        var s1GlobPath = path.join(__dirname, 'ittf', 'mock1.tests.ittf', '**/*.*').replace(/\\/g, '/')
        ;
        expect(mi.src()).to.be.a('string');
        expect(mi.src()).to.be('mock1.tests.ittf');
        expect(mi.srcFullPath()).to.be.a('string');
        expect(mi.srcFullPath()).to.be(s1Path);
        expect(mi.ignoreFullPath()).to.be(null);
        var misrcGlobPath = mi.srcGlobPath().replace(/\\/g, '/');
        expect(misrcGlobPath).to.be.a('string');
        expect(misrcGlobPath).to.be(s1GlobPath);
        expect(mi.srcGlobOptions()).to.be.an('object');
        expect(mi.srcGlobOptions().ignore).to.be(undefined);
        expect(mi.productionManagerInstance).to.be.an('object');
        if (mi.hasContext()) {
            var i, i_items=this.contexts, i_len=this.contexts.length, ctxMi;
            for (i=0; i<i_len; i++) {
                ctxMi = this.contexts[i];
                expect(ctxMi.productionManagerInstance).to.be.an('object');
            }
        }
        expect(mi.hasContext()).to.be(false);
        expect(mi.getModelCollectionInfo()).to.be(null);
    });
    it("should retrieve a loadModel function", function(done) {
        mi.getLoadModel(function(err, loadModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(loadModel).to.be.a('function');
            done();
        });
    });
    it("should retrieve a model transformer", function(done) {
        mi.getModelTransformer('tests/trans1', function(err, transformModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(transformModel.trans).to.be.a('function');
            done();
        });
    });
    it("should retrieve an artifact generator", function(done) {
        mi.getArtifactGenerator('tests/gen1', function(err, artifactGenerator) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(artifactGenerator.gen).to.be.a('function');
            done();
        });
    });
    it("should get a single source", function(done) {
        mi.getSource(function(err, source) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(source.length).to.be.a('number');
            expect(source.length).to.be(11);
            done();
        });
    });
    it("should get an error trying to ges sources (not a directory)", function(done) {
        mi.getSources(function(err, sources) {
            console.log('should get sources.sources', err, sources);
            expect(err.__is_error).to.be(true);
            expect(err.name).to.be.a('string');
            expect(err.name).to.be('InvalidOperation');
            done();
        });
    });
    it("should get source files", function(done) {
        mi.getFiles({
            final: false
        }, function(err, files) {
            expect(err.__is_error).to.be(true);
            done();
        });
    });
    it("should get modelInfos", function(done) {
        mi.getModelInfos({
            final: false
        }, function(err, modelInfos) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(modelInfos).to.be.an('array');
            expect(modelInfos.length).to.be(1);
            done();
        });
    });
    it("should clone a modelInfo", function() {
        var cloned = mi.clone();
        expect(cloned.cwd).to.be.equal(mi.cwd);
        expect(cloned.src()).to.be.equal(mi.src());
        expect(cloned.schema).to.be.equal(mi.schema);
        expect(cloned.format).to.be.equal(mi.format);
        // TODO check cloned collections
    });
    it("should read a JSON file", function(done) {
        mi.readJSON(path.join(__dirname, 'data', 'simple.tests.json'), function(err, json) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(json).to.be.an('object');
            done();
        });
    });
    it("should read an xml file", function(done) {
        mi.readXml('c:\\TODO.xml', function(err, xml) {
            expect(err.__is_error).to.be(true);
            expect(err.name).to.be.a('string');
            expect(err.name).to.be('NotFound');
            done();
        });
    });
    it("should check if the source exists", function(done) {
        mi.exists(function(err, exists) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(exists).to.be(true);
            done();
        });
    });
    it("should check if the source is a directory", function(done) {
        mi.isDirectory(function(err, isDirectory) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(isDirectory).to.be(false);
            done();
        });
    });
    it("should check if the source is a file", function(done) {
        mi.isFile(function(err, isFile) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(isFile).to.be(true);
            done();
        });
    });
});
