/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\tests\model\modelinfo_folder.js.ittf
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
                cwd: path.join(__dirname, 'ittf', 'folder1'), 
                src: './**/*.tests.ittf', 
                schema: 'tests'
            });
            mi.productionManager(pman);
            done();
        });
    });
    it("should get a single source", function(done) {
        mi.getSource(function(err, source) {
            expect(err.__is_error).to.be(true);
            done();
        });
    });
    it("should get sources", function(done) {
        var s1Path = path.join(__dirname, 'ittf', 'folder1', 'mock2.tests.ittf').replace(/\\/g, '/')
        ;
        mi.getSources(function(err, sources) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(sources).to.be.an('array');
            expect(sources.length).to.be(2);
            var s1 = sources[0];
            expect(s1.fullpath).to.be.a('string');
            expect(s1.fullpath).to.be(s1Path);
            expect(s1.relpath).to.be.a('string');
            expect(s1.relpath).to.be('mock2.tests.ittf');
            expect(s1.content).to.be.a('string');
            expect(s1.content).to.be('tests mock2');
            done();
        });
    });
    it("should get source files", function(done) {
        var s1Path = path.join(__dirname, 'ittf', 'folder1', 'mock2.tests.ittf').replace(/\\/g, '/')
        ;
        mi.getFiles({
            final: false
        }, function(err, files) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(files).to.be.an('array');
            expect(files.length).to.be(2);
            var f1 = files[0];
            expect(f1.fullpath).to.be.a('string');
            expect(f1.fullpath).to.be(s1Path);
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
            expect(isDirectory).to.be(true);
            done();
        });
    });
    it("should check if the source is a file", function(done) {
        mi.isFile(function(err, isFile) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            expect(isFile).to.be(false);
            done();
        });
    });
});
